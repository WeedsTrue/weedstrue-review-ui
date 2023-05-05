import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Group,
  Indicator,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import CreatePostImageList from './CreatePostImageList';
import CreatePostImageModal from './CreatePostImageModal';
import CreatePostReviewAdditions from './CreatePostReviewAdditions';
import DraftSelectModal from './DraftSelectModal';
import {
  PRODUCT_ATTRIBUTE_TYPE,
  USER_POST_TYPE
} from '../../../config/constants';
import { USER_POST_EFFECT_TYPE } from '../../../config/effectConstants';
import {
  deleteFilesFromStorageRecursively,
  uploadFileToStorage
} from '../../../helpers/awsHelper';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { usePrompt } from '../../../helpers/usePrompt';
import { Context as AuthContext } from '../../../providers/AuthProvider';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import CustomSearchItem from '../../common/CustomSearchItem';
import FormSection from '../../common/FormSection';
import SearchInput from '../../common/SearchInput';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import ProductSidebarInfo from '../products/ProductSidebarInfo';

const CreatePost = ({ postItem, postType, isPostItemLoading }) => {
  const { postUuid } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [forceSaveDraft, setForceSaveDraft] = useState(false);
  const hasSearched = useRef(false);
  const navigate = useNavigate();
  const {
    state,
    fetchUserDrafts,
    createUserPost,
    updateUserPost,
    deleteUserPost,
    fetchUserPostProductOptions,
    fetchUserPostSummary
  } = useContext(ReviewsContext);
  const { state: authState } = useContext(AuthContext);
  const [searchData, setSearchData] = useState({ brands: [], products: [] });
  const [formState, setFormState] = useState({
    userPost: null,
    title: '',
    content: '',
    draft: false,
    fkUserPostType: postItem
      ? USER_POST_TYPE.REVIEW.value
      : USER_POST_TYPE.DISCUSSION.value,
    fkPostItem: null,
    postItemType: postType,
    userPostImages: [],
    reviewState: {
      rating: null,
      attributes: {
        thc: '',
        cbd: '',
        terps: '',
        packagedDate: ''
      },
      effects: []
    },
    hasUnsavedChanges: false,
    isLoading: false,
    imageModal: {
      isOpen: false,
      selectedImage: null
    },
    isDraftSelectOpen: false
  });
  const userDrafts = state.userPostDrafts.value.filter(p => p.draft);
  const draftId = searchParams.get('draft');

  let postItemInfo = {};
  switch (postType) {
    case 'brand':
      postItemInfo = {
        pkPostItem: postItem?.pkBrand,
        name: postItem ? postItem.name : '',
        link: `/brands/${postItem?.uuid}`
      };
      break;
    case 'product':
      postItemInfo = {
        pkPostItem: postItem?.pkProduct,
        name: postItem ? `${postItem.name} - ${postItem.brand.name}` : '',
        link: `/products/${postItem?.uuid}`
      };
      break;
    default:
      break;
  }

  usePrompt(() => {
    setForceSaveDraft(true);
  }, formState.hasUnsavedChanges && !formState.isLoading);

  useEffect(() => {
    if (
      draftId &&
      !state.userPostDrafts.loading &&
      formState.userPost?.pkUserPost.toString() !== draftId
    ) {
      const userPost = userDrafts.find(
        d => d.pkUserPost.toString() === draftId
      );
      if (userPost) {
        selectDraft(userPost);
      }
    }
  }, [draftId, state.userPostDrafts.value]);

  useEffect(() => {
    if (!isPostItemLoading) {
      if (postUuid) {
        fetchUserPostSummary(postUuid, selectDraft, triggerNotification);
      } else {
        fetchUserDrafts();
        setFormState({
          userPost: null,
          title: '',
          content: '',
          draft: false,
          fkUserPostType: postItem
            ? USER_POST_TYPE.REVIEW.value
            : USER_POST_TYPE.DISCUSSION.value,
          fkPostItem: postItemInfo.pkPostItem,
          postItemType: postType,
          userPostImages: [],
          reviewState: {
            rating: null,
            attributes: {
              thc: '',
              cbd: '',
              terps: '',
              packagedDate: ''
            },
            effects: []
          },
          hasUnsavedChanges: false,
          isLoading: false,
          isDraftSelectOpen: false,
          imageModal: {
            isOpen: false,
            selectedImage: null
          }
        });
      }
    }
  }, [isPostItemLoading]);

  useEffect(() => {
    if (forceSaveDraft) {
      savePostPreflight(true);
      setForceSaveDraft(false);
    }
  }, [forceSaveDraft]);

  const onSuccess = (userPost, deletedImages) => {
    if (userPost.draft) {
      triggerNotification(
        formState.userPost
          ? 'Draft has been Updated!'
          : 'Draft has been saved!',
        'Success',
        'green'
      );
    } else {
      triggerNotification(
        formState.userPost
          ? 'Content has been updated!'
          : 'Content has been posted!',
        'Success',
        'green'
      );
      navigate(postItemInfo.link);
    }

    setFormState({
      ...formState,
      userPost,
      userPostImages: userPost.userPostImages.sort((a, b) => a.index - b.index),
      isLoading: false,
      hasUnsavedChanges: false
    });

    deleteFilesFromStorageRecursively(
      deletedImages.filter(i => i.src).map(i => i.src)
    );
  };

  const onError = message => {
    setFormState({
      ...formState,
      isLoading: false
    });
    triggerNotification(message);
  };

  const getFormStateRequestData = (finalFormState, isDraft) => {
    const isReview =
      finalFormState.fkUserPostType === USER_POST_TYPE.REVIEW.value;
    return {
      ...finalFormState,
      effectTypes: isReview
        ? finalFormState.reviewState.effects.map(e => ({
            pkUserPostEffectType: e.value,
            description: e.description
          }))
        : [],
      rating: isReview ? finalFormState.reviewState.rating : null,
      attributes: isReview
        ? Object.entries(finalFormState.reviewState.attributes).map(e => {
            const fkProductAttributeType = PRODUCT_ATTRIBUTE_TYPE.find(
              t => t.inputValue === e[0]
            )?.value;
            return {
              fkProductAttributeType,
              Value: e[1]?.toString()
            };
          })
        : [],
      draft: isDraft
    };
  };

  const savePostPreflight = isDraft => {
    setFormState({
      ...formState,
      draft: isDraft,
      isLoading: true
    });

    saveImagesToStorageRecursively(
      formState.userPostImages,
      results => saveUserPost(results, isDraft),
      results => saveUserPost(results, isDraft)
    );
  };

  const saveUserPost = (results, isDraft) => {
    if (formState.userPost) {
      updateUserPost(
        formState.userPost.pkUserPost,
        getFormStateRequestData(
          { ...formState, userPostImages: results.images },
          isDraft
        ),
        post => onSuccess(post, results.deletedImages),
        onError
      );
    } else {
      createUserPost(
        getFormStateRequestData(
          { ...formState, userPostImages: results.images },
          isDraft
        ),
        post => onSuccess(post, results.deletedImages),
        onError
      );
    }
  };

  const saveImagesToStorageRecursively = (
    userPostImages,
    onSuccess,
    onError,
    currentResults = {
      images: [],
      deletedImages: []
    }
  ) => {
    const images = [...userPostImages];
    if (images.length === 0) {
      onSuccess(currentResults);
    } else {
      const image = images.splice(0, 1)[0];
      let isUploading = false;
      if (image.deleted) {
        currentResults.deletedImages.push({
          ...image
        });
      } else if (!image.previewImage) {
        currentResults.images.push({
          ...image
        });
      } else {
        if (image.src) {
          currentResults.deletedImages.push({ ...image });
        }

        isUploading = true;
        uploadFileToStorage(
          `user-${authState.userData.pkUser}-post-image-${
            image.index
          }-${new Date().getTime()}`,
          image.file,
          src => {
            currentResults.images.push({
              ...image,
              src
            });
            saveImagesToStorageRecursively(
              images,
              onSuccess,
              onError,
              currentResults
            );
          },
          () => {
            saveImagesToStorageRecursively(
              images,
              onSuccess,
              onError,
              currentResults
            );
          }
        );
      }

      if (!isUploading) {
        saveImagesToStorageRecursively(
          images,
          onSuccess,
          onError,
          currentResults
        );
      }
    }
  };

  const selectDraft = userPost => {
    setFormState({
      ...formState,
      userPost,
      title: userPost.title,
      content: userPost.content,
      draft: userPost.draft,
      fkUserPostType: userPost.fkUserPostType,
      userPostImages: userPost.userPostImages.sort((a, b) => a.index - b.index),
      reviewState: {
        rating: userPost.userRating,
        attributes: userPost.attributes.reduce((a, v) => {
          const attribute = PRODUCT_ATTRIBUTE_TYPE.find(
            t => t.value === v.fkProductAttributeType
          );
          return {
            ...a,
            [attribute.inputValue]: v.value
          };
        }, {}),
        effects: USER_POST_EFFECT_TYPE.filter(e =>
          userPost.effectTypes.includes(e.value)
        )
      },
      hasUnsavedChanges: false,
      isLoading: false,
      isDraftSelectOpen: false,
      imageModal: {
        isOpen: false,
        selectedImage: null
      }
    });
  };

  return (
    !isPostItemLoading && (
      <Stack
        sx={{ flex: 1, margin: '20px auto', width: '100%', maxWidth: 1100 }}
      >
        <Group
          sx={{
            gap: 20,
            alignItems: 'start',
            justifyContent: 'center',
            flex: 1
          }}
        >
          <Stack sx={{ gap: 40, flex: 2, maxWidth: 725 }}>
            <Card shadow="xl" sx={{}}>
              <FormSection
                hideButtons
                onSubmit={() => {
                  savePostPreflight(false);
                }}
                sx={{ gap: 20 }}
              >
                <Group sx={{ justifyContent: 'space-between' }}>
                  <Title order={4}>
                    {postUuid
                      ? 'Edit post'
                      : formState.userPost
                      ? 'Edit draft'
                      : 'Create a post'}
                  </Title>
                  {!postUuid && (
                    <Button
                      color="dark"
                      onClick={() => {
                        setFormState({
                          ...formState,
                          isDraftSelectOpen: true
                        });
                      }}
                      radius="xl"
                      size="xs"
                      type="button"
                      uppercase
                      variant="subtle"
                    >
                      <Group>
                        <Title order={6} sx={{ color: 'dodgerblue' }}>
                          Drafts
                        </Title>
                        <Indicator
                          color="gray"
                          label={userDrafts.length.toString()}
                          radius="xs"
                          styles={{
                            common: {
                              height: 20
                            }
                          }}
                          sx={{ marginRight: 10 }}
                        />
                      </Group>
                    </Button>
                  )}
                </Group>
                <Divider />
                <Stack sx={{ gap: 10 }}>
                  <Group sx={{ justifyContent: 'space-between' }}>
                    <SearchInput
                      data={
                        (postItem && !hasSearched.current) ||
                        (searchData.brands.length === 0 &&
                          searchData.products.length === 0)
                          ? postItem
                            ? [
                                {
                                  label: postItemInfo.name,
                                  value: postItemInfo.link
                                }
                              ]
                            : []
                          : [
                              ...searchData.brands.map(b => ({
                                label: b.name,
                                value: `/brands/${b.uuid}`
                              })),
                              ...searchData.products.map(p => ({
                                label: p.name,
                                description: p.brand.name,
                                value: `/products/${p.uuid}`
                              }))
                            ].sort((a, b) => a.label.localeCompare(b.label))
                      }
                      itemComponent={CustomSearchItem}
                      onChange={value => {
                        navigate(`${value}/submit`);
                        hasSearched.current = false;
                      }}
                      onSearch={searchTerm => {
                        if (searchTerm) {
                          fetchUserPostProductOptions(
                            searchTerm,
                            setSearchData
                          );
                          hasSearched.current = true;
                        }
                      }}
                      placeholder="Search a product..."
                      sx={{ maxWidth: 300 }}
                      value={postItemInfo.link}
                    />
                    <Select
                      data={Object.entries(USER_POST_TYPE)
                        .map(a => a[1])
                        .filter(t => postItem || t.value !== 1)
                        .sort((a, b) => a.label.localeCompare(b.label))}
                      onChange={value =>
                        setFormState({
                          ...formState,
                          fkUserPostType: value,
                          hasUnsavedChanges: true
                        })
                      }
                      value={formState.fkUserPostType}
                    />
                  </Group>

                  <TextInput
                    onChange={e =>
                      setFormState({
                        ...formState,
                        title: e.currentTarget.value.substring(0, 255),
                        hasUnsavedChanges: true
                      })
                    }
                    placeholder="Title"
                    required
                    value={formState.title}
                  />
                  <Textarea
                    autosize
                    minRows={7}
                    onChange={e =>
                      setFormState({
                        ...formState,
                        content: e.currentTarget.value.substring(0, 4000),
                        hasUnsavedChanges: true
                      })
                    }
                    placeholder="Text (required)"
                    required
                    value={formState.content}
                  />

                  <Stack sx={{ gap: 5 }}>
                    <Group sx={{ justifyContent: 'space-between' }}>
                      <Group sx={{ gap: 10 }}>
                        <Text weight={500}>Images</Text>
                        <Text color="grey" sx={{ fontSize: 12 }}>
                          (Add up to 5)
                        </Text>
                      </Group>
                      {formState.userPostImages.length < 5 && (
                        <Button
                          compact
                          onClick={() =>
                            setFormState({
                              ...formState,
                              imageModal: {
                                isOpen: true,
                                selectedImage: null
                              }
                            })
                          }
                          variant="outline"
                        >
                          Add Image
                        </Button>
                      )}
                    </Group>
                    <Stack sx={{ gap: 10 }}>
                      {formState.userPostImages.filter(i => !i.deleted)
                        .length === 0 ? (
                        <Group
                          sx={{ border: 'solid 1px lightgrey', padding: 10 }}
                        >
                          <Stack sx={{ gap: 3, alignItems: 'center', flex: 1 }}>
                            <Text color="grey" sx={{ fontSize: 14 }}>
                              Add your first image!
                            </Text>
                            <Button
                              compact
                              onClick={() =>
                                setFormState({
                                  ...formState,
                                  imageModal: {
                                    isOpen: true,
                                    selectedImage: null
                                  }
                                })
                              }
                              variant="outline"
                            >
                              Add Image
                            </Button>
                          </Stack>
                        </Group>
                      ) : (
                        <CreatePostImageList
                          onAction={(action, image) => {
                            if (action === 'REMOVE') {
                              const postImagesCopy = [
                                ...formState.userPostImages
                              ];
                              const index = postImagesCopy.findIndex(
                                i => i.pkUserPostImage === image.pkUserPostImage
                              );
                              postImagesCopy[index].deleted = true;

                              setFormState({
                                ...formState,
                                userPostImages: postImagesCopy,
                                hasUnsavedChanges: true
                              });
                            } else if (action === 'EDIT') {
                              setFormState({
                                ...formState,
                                imageModal: {
                                  ...formState.imageModal,
                                  isOpen: true,
                                  selectedImage: image
                                },
                                hasUnsavedChanges: true
                              });
                            }
                          }}
                          onOrderChange={updatedImages =>
                            setFormState({
                              ...formState,
                              userPostImages: [
                                ...formState.userPostImages.filter(
                                  i => i.deleted
                                ),
                                ...updatedImages.map((i, index) => ({
                                  ...i,
                                  index
                                }))
                              ],
                              hasUnsavedChanges: true
                            })
                          }
                          postImages={formState.userPostImages.filter(
                            i => !i.deleted
                          )}
                        />
                      )}
                    </Stack>
                  </Stack>
                  {formState.fkUserPostType === USER_POST_TYPE.REVIEW.value && (
                    <CreatePostReviewAdditions
                      onPostReviewStateChange={newReviewState =>
                        setFormState({
                          ...formState,
                          reviewState: newReviewState,
                          hasUnsavedChanges: true
                        })
                      }
                      postReviewState={formState.reviewState}
                      postType={postType}
                    />
                  )}
                </Stack>

                <Divider />
                <Group sx={{ justifyContent: 'end' }}>
                  {postUuid ? (
                    <Button
                      color="red"
                      disabled={!formState.delete && formState.isLoading}
                      loading={formState.delete && formState.isLoading}
                      onClick={() => {}}
                      radius="xl"
                      type="button"
                      value="draft"
                      variant="outline"
                    >
                      Delete Post
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        !formState.hasUnsavedChanges ||
                        (!formState.draft && formState.isLoading)
                      }
                      loading={formState.draft && formState.isLoading}
                      onClick={() => savePostPreflight(true)}
                      radius="xl"
                      type="button"
                      value="draft"
                      variant="outline"
                    >
                      {formState.userPost ? 'Update Draft' : 'Save Draft'}
                    </Button>
                  )}
                  <Button
                    disabled={
                      !formState.title ||
                      (formState.draft && formState.isLoading)
                    }
                    loading={!formState.draft && formState.isLoading}
                    radius="xl"
                    type="submit"
                  >
                    {postUuid ? 'Update' : 'Post'}
                  </Button>
                </Group>
              </FormSection>
            </Card>
          </Stack>
          {postItem && (
            <Stack style={{ flex: 1, maxWidth: 332 }}>
              {postType === 'brand' ? (
                <BrandSidebarInfo brand={postItem} />
              ) : (
                postType === 'product' && (
                  <ProductSidebarInfo product={postItem} />
                )
              )}
            </Stack>
          )}
        </Group>
        <CreatePostImageModal
          isOpen={formState.imageModal.isOpen}
          onAdd={imageState => {
            const existingImageIndex = formState.userPostImages.findIndex(
              i => i.pkUserPostImage === imageState.pkUserPostImage
            );
            if (existingImageIndex !== -1) {
              const imagesCopy = [...formState.userPostImages];
              imagesCopy[existingImageIndex] = {
                ...imagesCopy[existingImageIndex],
                ...imageState
              };
              setFormState({
                ...formState,
                userPostImages: imagesCopy,
                imageModal: {
                  ...formState.imageModal,
                  isOpen: false
                },
                hasUnsavedChanges: true
              });
            } else {
              setFormState({
                ...formState,
                userPostImages: [
                  ...formState.userPostImages,
                  { ...imageState, index: formState.userPostImages.length }
                ],
                imageModal: {
                  ...formState.imageModal,
                  isOpen: false
                },
                hasUnsavedChanges: true
              });
            }
          }}
          onClose={() =>
            setFormState({
              ...formState,
              imageModal: {
                ...formState.imageModal,
                isOpen: false
              }
            })
          }
          postImage={formState.imageModal.selectedImage}
        />
        <DraftSelectModal
          isOpen={formState.isDraftSelectOpen}
          onClose={() =>
            setFormState({
              ...formState,
              isDraftSelectOpen: false
            })
          }
          onDelete={userPost => {
            deleteUserPost(
              userPost.pkUserPost,
              () => {
                if (userPost.pkUserPost === formState.userPost?.pkUserPost) {
                  setFormState({
                    ...formState,
                    userPost,
                    title: '',
                    content: '',
                    draft: true,
                    fkUserPostType: userPost.fkUserPostType,
                    hasUnsavedChanges: false,
                    isLoading: false,
                    isDraftSelectOpen: false
                  });
                }
              },
              () => {
                triggerNotification();
              }
            );
          }}
          onSelect={userPost => {
            if (
              userPost.pkPostItem &&
              postItemInfo.pkPostItem !== userPost.pkPostItem
            ) {
              switch (userPost.postItemType) {
                case 'brand':
                  navigate(
                    `/brands/${userPost.postItemUuid}/submit?draft=${userPost.pkUserPost}`
                  );
                  break;
                case 'product':
                  navigate(
                    `/products/${userPost.postItemUuid}/submit?draft=${userPost.pkUserPost}`
                  );
                  break;
                default:
                  break;
              }
            }

            selectDraft(userPost);
          }}
          selectUserPost={formState.userPost}
          userPosts={userDrafts}
        />
      </Stack>
    )
  );
};

CreatePost.propTypes = {
  isPostItemLoading: PropTypes.bool,
  postItem: PropTypes.object,
  PostItemComponent: PropTypes.any,
  postType: PropTypes.string
};

export default CreatePost;

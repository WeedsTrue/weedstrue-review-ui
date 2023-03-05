import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  Divider,
  Group,
  Indicator,
  Select,
  Stack,
  Textarea,
  TextInput,
  Title
} from '@mantine/core';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import CreatePostReviewAdditions from './CreatePostReviewAdditions';
import DraftSelectModal from './DraftSelectModal';
import {
  USER_POST_ATTRIBUTE_TYPE,
  USER_POST_TYPE
} from '../../../config/constants';
import { USER_POST_EFFECT_TYPE } from '../../../config/effectConstants';
import { triggerNotification } from '../../../helpers/notificationHelper';
import { Context as ReviewsContext } from '../../../providers/ReviewsProvider';
import FormSection from '../../common/FormSection';
import BrandSidebarInfo from '../brands/BrandSidebarInfo';
import ProductSidebarInfo from '../products/ProductSidebarInfo';

const CreatePost = ({ postItem, postType, isPostItemLoading }) => {
  const navigate = useNavigate();
  const {
    state,
    fetchUserDrafts,
    createUserPost,
    updateUserPost,
    deleteUserPost
  } = useContext(ReviewsContext);
  const [formState, setFormState] = useState({
    userPost: null,
    title: '',
    content: '',
    draft: false,
    fkUserPostType: USER_POST_TYPE.REVIEW.value,
    fkPostItem: null,
    postItemType: postType,
    reviewState: {
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
    isDraftSelectOpen: false
  });
  const userDrafts = state.userPosts.value.filter(p => p.draft);

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

  useEffect(() => {
    if (!isPostItemLoading) {
      fetchUserDrafts();
      setFormState({
        userPost: null,
        title: '',
        content: '',
        draft: false,
        fkUserPostType: USER_POST_TYPE.REVIEW.value,
        fkPostItem: postItemInfo.pkPostItem,
        postItemType: postType,
        reviewState: {
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
        isDraftSelectOpen: false
      });
    }
  }, [isPostItemLoading]);

  const onSuccess = userPost => {
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
      isLoading: false,
      hasUnsavedChanges: false
    });
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
      attributes: isReview
        ? Object.entries(finalFormState.reviewState.attributes).map(e => {
            const fkUserPostAttributeType = USER_POST_ATTRIBUTE_TYPE.find(
              t => t.inputValue === e[0]
            )?.value;
            return {
              fkUserPostAttributeType,
              Value: e[1]?.toString()
            };
          })
        : [],
      draft: isDraft
    };
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
            flex: 1
          }}
        >
          <Stack sx={{ gap: 40, flex: 2 }}>
            <Card shadow="xl" sx={{}}>
              <FormSection
                hideButtons
                onSubmit={() => {
                  setFormState({
                    ...formState,
                    draft: false,
                    isLoading: true
                  });

                  if (formState.userPost) {
                    updateUserPost(
                      formState.userPost.pkUserPost,
                      getFormStateRequestData(formState, false),
                      onSuccess,
                      onError
                    );
                  } else {
                    createUserPost(
                      getFormStateRequestData(formState, false),
                      onSuccess,
                      onError
                    );
                  }
                }}
                sx={{ gap: 20 }}
              >
                <Group sx={{ justifyContent: 'space-between' }}>
                  <Title order={4}>
                    {formState.userPost ? 'Edit draft' : 'Create a post'}
                  </Title>
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
                </Group>
                <Divider />
                <Stack sx={{ gap: 10 }}>
                  <Group sx={{ justifyContent: 'space-between' }}>
                    <Select
                      data={[
                        { label: postItemInfo.name, value: postItemInfo.name }
                      ]}
                      disabled
                      sx={{ maxWidth: 300 }}
                      value={postItemInfo.name}
                    />
                    <Select
                      data={Object.entries(USER_POST_TYPE)
                        .map(a => a[1])
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
                        content: e.currentTarget.value.substring(0, 2000),
                        hasUnsavedChanges: true
                      })
                    }
                    placeholder="Text (required)"
                    required
                    value={formState.content}
                  />
                  {postType === 'product' &&
                    formState.fkUserPostType ===
                      USER_POST_TYPE.REVIEW.value && (
                      <CreatePostReviewAdditions
                        onPostReviewStateChange={newReviewState =>
                          setFormState({
                            ...formState,
                            reviewState: newReviewState,
                            hasUnsavedChanges: true
                          })
                        }
                        postReviewState={formState.reviewState}
                      />
                    )}
                </Stack>

                <Divider />
                <Group sx={{ justifyContent: 'end' }}>
                  <Button
                    disabled={
                      !formState.hasUnsavedChanges ||
                      (!formState.draft && formState.isLoading)
                    }
                    loading={formState.draft && formState.isLoading}
                    onClick={() => {
                      setFormState({
                        ...formState,
                        draft: true,
                        isLoading: true
                      });
                      if (formState.userPost) {
                        updateUserPost(
                          formState.userPost.pkUserPost,
                          getFormStateRequestData(formState, true),
                          onSuccess,
                          onError
                        );
                      } else {
                        createUserPost(
                          getFormStateRequestData(formState, true),
                          onSuccess,
                          onError
                        );
                      }
                    }}
                    radius="xl"
                    type="button"
                    value="draft"
                    variant="outline"
                  >
                    {formState.userPost ? 'Update Draft' : 'Save Draft'}
                  </Button>
                  <Button
                    disabled={
                      !formState.title ||
                      (formState.draft && formState.isLoading)
                    }
                    loading={!formState.draft && formState.isLoading}
                    radius="xl"
                    type="submit"
                  >
                    Post
                  </Button>
                </Group>
              </FormSection>
            </Card>
          </Stack>
          <Stack sx={{ flex: 1 }}>
            {postType === 'brand' ? (
              <BrandSidebarInfo brand={postItem} />
            ) : (
              postType === 'product' && (
                <ProductSidebarInfo product={postItem} />
              )
            )}
          </Stack>
        </Group>
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
            setFormState({
              ...formState,
              userPost,
              title: userPost.title,
              content: userPost.content,
              draft: userPost.draft,
              fkUserPostType: userPost.fkUserPostType,
              reviewState: {
                attributes: userPost.attributes.reduce((a, v) => {
                  const attribute = USER_POST_ATTRIBUTE_TYPE.find(
                    t => t.value === v.fkUserPostAttributeType
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
              isDraftSelectOpen: false
            });
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

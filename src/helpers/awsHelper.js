import { Storage } from '@aws-amplify/storage';
import { S3_PUBLIC_URL } from '../config/constants';
import { logger } from '../helpers/logger';

const uploadFileToStorage = async (
  identifier,
  file,
  onSuccess,
  onError,
  config = {}
) => {
  try {
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const fileName = `${identifier}.${fileExtension}`;

    let contentType = null;
    switch (fileExtension) {
      case 'png':
        contentType = 'image/png';
        break;
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      default:
        break;
    }
    const response = await Storage.put(fileName, file, {
      contentType,
      ...config
    });
    logger(response);
    if (onSuccess) {
      onSuccess(`${S3_PUBLIC_URL}${response.key}`, fileName);
    }
  } catch (e) {
    logger(e);
    if (onError) {
      onError(e);
    }
  }
};

const deleteFilesFromStorageRecursively = fileUrls => {
  if (fileUrls.length === 0) {
    return;
  }

  const fileUrlsCopy = [...fileUrls];
  const url = fileUrlsCopy.splice(0, 1)[0];
  deleteFileFromStorage(url, () =>
    deleteFilesFromStorageRecursively(fileUrlsCopy)
  );
};

const deleteFileFromStorage = async (url, onSuccess) => {
  try {
    const response = await Storage.remove(url.replace(S3_PUBLIC_URL, ''));
    logger(response);

    if (onSuccess) {
      onSuccess();
    }
  } catch (e) {
    logger(e);
  }
};

export {
  uploadFileToStorage,
  deleteFileFromStorage,
  deleteFilesFromStorageRecursively
};

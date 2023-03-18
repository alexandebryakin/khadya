import { Modal, Upload, UploadFile, UploadProps, notification } from 'antd';
import { AddOutline } from 'antd-mobile-icons';
import { RcFile } from 'antd/es/upload';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Attachment,
  Restaurant,
  Status,
  useAddRestaurantAttachmentMutation,
  useRemoveRestaurantAttachmentMutation,
} from '../../../../../api/graphql.types';
import { useAuth } from '../../../../../providers/AuthProvider';
import styles from './GalleryForm.module.scss';

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const DONT_UPLOAD_AUTOMATICALLY = false;

const getUploadedFiles = (images: Attachment[]): UploadFile[] => {
  return images.map((image) => ({
    uid: image.id,
    name: image.id,
    url: image.url,
  }));
};

interface GalleryFormProps {
  restaurantId: UUID;
}

const GalleryForm = ({ restaurantId }: GalleryFormProps) => {
  const [t] = useTranslation('common');
  const [previewOpen, setPreviewOpen] = React.useState(false);
  const [previewImage, setPreviewImage] = React.useState('');
  const [previewTitle, setPreviewTitle] = React.useState('');
  const auth = useAuth();
  const [fileList, setFileList] = React.useState<UploadFile[]>(
    getUploadedFiles(auth.user.restaurants.find((r) => r.id === restaurantId)!.images)
  );

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const [addAttachment] = useAddRestaurantAttachmentMutation();
  const [removeAttachment] = useRemoveRestaurantAttachmentMutation();

  const replaceRetaurant = (restaurant: Restaurant) => {
    auth.setUser({
      ...auth.user,
      restaurants: [...auth.user.restaurants.filter((r) => r.id !== restaurantId), restaurant],
    });
  };

  const handleRemoveAttachment = async (file: UploadFile): Promise<boolean> => {
    const response = await removeAttachment({
      variables: {
        restaurantId,
        attachmentId: file.uid,
      },
    });

    const data = response.data?.removeRestaurantAttachment;

    if (data?.status === Status.Success) {
      const { restaurant } = data;
      replaceRetaurant(restaurant);
      return true;
    } else {
      notification.error({ message: t('restaurant.errors.failedToRemoveImage') });
      return false;
    }
  };

  const onChange: UploadProps['onChange'] = async (info) => {
    const { fileList: newFileList, file } = info;

    if (file.status === 'removed') {
      const removed = await handleRemoveAttachment(file);
      if (!removed) return;
    }

    setFileList(newFileList);
  };

  const handleAddAttachment: UploadProps['beforeUpload'] = async (file: RcFile) => {
    const response = await addAttachment({
      variables: {
        restaurantId,
        attachment: file,
      },
    });

    const data = response.data?.addRestaurantAttachment;
    if (data?.status === Status.Success) {
      const { restaurant } = data;
      replaceRetaurant(restaurant);

      setFileList(getUploadedFiles(restaurant.images));
    } else {
      notification.error({ message: t('restaurant.errors.failedToUploadImage') });
    }

    return DONT_UPLOAD_AUTOMATICALLY;
  };

  return (
    <>
      <Upload
        accept="image/*"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={handleAddAttachment}
        onPreview={handlePreview}
        onChange={onChange}
      >
        <div>
          <AddOutline />
          <div className={styles.uploadButton}>{t('generic.upload')}</div>
        </div>
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" className={styles.imagePreview} src={previewImage} />
      </Modal>
    </>
  );
};

export default GalleryForm;

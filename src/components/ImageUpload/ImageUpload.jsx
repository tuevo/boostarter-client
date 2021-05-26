import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  message,
  Modal, Upload
} from 'antd';
import React, { useState } from 'react';

export const getBase64 = (file) => (new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    if (reader.result === null) {
      reject(new Error('Không đọc được tập tin'));
      return;
    }

    resolve(reader.result.toString());
  };
  reader.onerror = (error) => reject(error);
  reader.readAsDataURL(file);
}));

export const getMultiBase64 = (files) => Promise.all(files.map(getBase64));

const ErrorList = {
  Uploading: 'uploading',
  Done: 'done',
  Error: 'error'
}

export const ImageUpload = (props) => {
  const {
    name,
    action,
    fileList,
    showUploadList,
    multiple,
    accept,
    onRemove,
    onDownload,
    onChange,
    beforeUpload,
  } = props;

  const [state, setState] = useState({
    previewType: '',
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    imageUrl: '',
    loading: false,
  });

  const handleChange = async (info) => {
    if (!showUploadList) {
      if (info.file.status === ErrorList.Uploading) {
        setState({ ...state, loading: true });
        return;
      }

      if (info.file.status === ErrorList.Done && info.file.originFileObj) {
        const imageUrl = await getBase64(info.file.originFileObj);
        setState({
          ...state,
          imageUrl: imageUrl || '',
          loading: false,
        });
      }
    }

    if (info.file.status === ErrorList.Error) {
      const { url } = info.file;
      if (url) {
        const nameFile = info.file.name || url.substring(url.lastIndexOf('/'));
        message.error(`${nameFile} tải lên lỗi.`);
      } else {
        message.error('Không thấy tập tin');
      }

      setState({
        ...state,
        loading: false,
      });
    }
  };

  const getFileName = ({ name: filename, url }) => {
    const tmp = url || '';
    if (!filename && !tmp) {
      return 'không tên';
    }

    return filename || tmp.substring(tmp.lastIndexOf('/') + 1);
  };

  const handleCancel = () => setState({ ...state, previewVisible: false });

  const handlePreview = async (file) => {
    const nameFile = getFileName(file);
    let preview = '';

    if (!file.url && file.originFileObj) {
      preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewType: file.type,
      previewImage: file.url || preview,
      previewVisible: true,
      previewTitle: nameFile,
    });
  };

  const renderLoading = () => {
    if (state.loading) {
      return <LoadingOutlined />;
    }

    return <PlusOutlined />;
  };

  const renderImage = () => {
    if (state.imageUrl) {
      return <img src={state.imageUrl} alt="avatar" style={{ width: '100%' }} />;
    }

    return (
      <div>
        { renderLoading()}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
  };

  const renderPreviewByType = () => {
    if ((/(mp4|m4v|avi|mpg|webm)$/i).test(state.previewType)) {
      return (
        <video src={state.previewImage} style={{ width: '100%' }} controls>
          <track default kind="captions" />
        </video>
      );
    }

    return <img alt="example" style={{ width: '100%' }} src={state.previewImage} />;
  };

  return (
    <>
      <Upload
        beforeUpload={beforeUpload || (() => false)}
        fileList={fileList}
        action={action}
        name={name || ''}
        listType="picture-card"
        className="avatar-uploader"
        onChange={onChange || handleChange}
        onPreview={handlePreview}
        onRemove={onRemove}
        onDownload={onDownload}
        showUploadList={showUploadList}
        multiple={multiple}
        accept={accept}
      >
        {renderImage()}
      </Upload>
      <Modal
        visible={state.previewVisible}
        title={state.previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {renderPreviewByType()}
      </Modal>
    </>
  );
};
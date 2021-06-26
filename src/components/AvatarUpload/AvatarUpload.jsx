import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import {

    message,
    Tooltip,
    Upload
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React, { useEffect, useState } from 'react';
import './AvatarUpload.scss';

const UploadButton = ({ loading, uploadText }) => {
    return (
        <div>
            {loading ? <LoadingOutlined /> : <UploadOutlined />}
            <div style={{ marginTop: 8 }}>{uploadText}</div>
        </div>
    );
};

export const AvatarUpload = ({
    initImageUrl,
    onChangeImage,
    uploadText,
    tooltipText,
}) => {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState(initImageUrl || null);

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('Vui lòng chọn ảnh *.jpeg hoặc *.png');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Kích thước ảnh quá lớn');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done' && info.file.originFileObj) {
            getBase64(info.file.originFileObj, (result) => {
                setLoading(false);
                setImageUrl(result);
            });
        }

        if (info.file.status === 'error') {
            const { url } = info.file;
            if (!url) {
                message.error('Kích thước ảnh quá lớn');
            }

            setLoading(false);
        }
    };

    useEffect(() => {
        setImageUrl(initImageUrl || null);
    }, [initImageUrl]);

    useEffect(() => {
        onChangeImage(imageUrl);
    }, [imageUrl]);

    return (
        <Upload
            name="avatar"
            {...!imageUrl ? { listType: 'picture-card' } : {}}
            className="avatar-upload__container"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {imageUrl ? (
                <div className="avatar-upload__avatar">
                    {loading && (
                        <div className="avatar-upload__loading">
                            <LoadingOutlined className="avatar-upload__spinner" />
                        </div>
                    )}
                    <Tooltip title={tooltipText} placement="top">
                        <Avatar src={imageUrl.toString()} size={100} />
                    </Tooltip>
                </div>
            ) : (
                <UploadButton loading={loading} uploadText={uploadText} />
            )}
        </Upload>
    );
};

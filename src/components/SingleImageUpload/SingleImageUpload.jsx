import { CloudUploadOutlined, DeleteFilled, PictureFilled } from '@ant-design/icons';
import { Button, Dropdown, Image, Menu } from 'antd';
import React, { useRef, useState } from 'react';
import './SingleImageUpload.scss';

export default function SingleImageUpload({ uploadText, initImageUrl, onImageChange }) {
    const [imagePreviewUrl, setImagePreviewUrl] = useState(initImageUrl);
    const [uploadingVisible, setUploadingVisible] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);
    const btnUploadRef = useRef();

    const handleImageChange = (e) => {
        e.preventDefault();

        let reader = new FileReader();
        let image = e.target.files[0];

        reader.onloadend = () => {
            onImageChange(reader.result);
            setImagePreviewUrl(reader.result);
        }

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    const handleMouseOver = (e) => {
        if (uploadingVisible && !imagePreviewUrl)
            return;

        setUploadingVisible(true);
    }

    const handleMouseOut = (e) => {
        if (!imagePreviewUrl)
            return;

        setUploadingVisible(false);
    }

    const handleClickEditMenuItem = index => {
        setAnchorEl(null);
        switch (index) {
            case '1':
                if (btnUploadRef.current) {
                    btnUploadRef.current.click();
                }
                break;
            case '2':
                setImagePreviewUrl('');
                onImageChange('');
                break;

            default:
                break;
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'image-uploading-edit-menu' : undefined;

    return (
        <div className="single-image-upload">
            <div
                className="single-image-upload__dark-cover"
                style={{ opacity: uploadingVisible ? 1 : 0 }}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
            >
                <input
                    accept="image/*"
                    id="single-image-upload"
                    type="file"
                    onChange={handleImageChange}
                    hidden
                />
                <label
                    htmlFor="single-image-upload"
                    style={{ color: '#fff', display: uploadingVisible && !imagePreviewUrl ? 'block' : 'none' }}
                >
                    <Button
                        ref={el => (btnUploadRef.current = el)}
                        icon={<PictureFilled />}
                        onClick={() => document.getElementById('single-image-upload').click()}
                    >
                        {uploadText}
                    </Button>
                </label>

                {imagePreviewUrl && (
                    <React.Fragment>
                        <Dropdown overlay={(
                            <Menu onClick={(e) => handleClickEditMenuItem(e.key)}>
                                <Menu.Item key="1" icon={<CloudUploadOutlined />}>
                                    {uploadText}
                                </Menu.Item>
                                <Menu.Item key="2" icon={<DeleteFilled />}>
                                    Gỡ
                                </Menu.Item>
                            </Menu>
                        )}>
                            <Button
                                className="single-image-upload__btn-edit"
                                icon={<PictureFilled />}
                                aria-describedby={id}
                                onClick={() => document.getElementById('single-image-upload').click()}
                            >
                                Chỉnh sửa ảnh
                            </Button>
                        </Dropdown>
                    </React.Fragment>
                )}

            </div>
            {imagePreviewUrl && (
                <Image src={imagePreviewUrl} />
            )}
            {!imagePreviewUrl && <div className="single-image-upload__spacing"></div>}
        </div>
    )
}

import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import Editor from '../Editor/Editor';
import { ImageUpload } from '../ImageUpload';
import './PostStatusModal.scss';

export default function PostStatusModal({ visible, onClose, onSubmit }) {
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);

    return (
        <Modal
            wrapClassName="post-status-modal"
            title="Trạng thái mới"
            visible={visible}
            closable
            onCancel={() => onClose()}
            footer={null}
            width={800}
        >
            <div className="post-status-modal__editor">
                <Editor
                    content={content}
                    onChange={newContent => setContent(newContent)}
                />
            </div>
            <div className="post-status-modal__media-upload">
                <ImageUpload
                    uploadText="Tải ảnh lên"
                    multiple
                    onChange={(e) => setFileList(e.fileList)}
                />
            </div>
            <Button
                style={{ width: '100%' }}
                type="primary"
                size="large"
                onClick={() => onSubmit(content, fileList)}
            >
                Đăng trạng thái
            </Button>
        </Modal>
    )
}

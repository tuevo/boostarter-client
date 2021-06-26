import { Button, Modal } from 'antd'
import React, { useState } from 'react';
import Editor from '../Editor';
import './StoryEditingModal.scss';

export default function StoryEditingModal({ visible, initContent, onClose, onSubmit }) {
    const [content, setContent] = useState(initContent || '');

    return (
        <Modal
            wrapClassName="app-story-editor"
            title="Chỉnh sửa câu chuyện"
            visible={visible}
            closable
            onCancel={() => onClose()}
            footer={null}
            width={750}
        >
            <div className="app-story-editor__body">
                <Editor
                    content={content}
                    onChange={newContent => setContent(newContent)}
                />
            </div>
            <div className="app-story-editor__footer">
                <Button
                    type="primary"
                    size="large"
                    onClick={() => onSubmit(content)}
                >
                    Cập nhật câu chuyện
            </Button>
            </div>
        </Modal>
    )
}

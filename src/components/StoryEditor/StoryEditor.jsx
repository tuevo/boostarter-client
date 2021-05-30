import { Button, Modal } from 'antd'
import React from 'react';
import Editor from '../Editor';
import './StoryEditor.scss';

export default function StoryEditor({ visible, initContent, onClose, onSubmit }) {
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
        <Editor initContent={initContent} />
      </div>
      <div className="app-story-editor__footer">
        <Button
          type="primary"
          size="large"
          onClick={() => onSubmit()}
        >
          Cập nhật câu chuyện
        </Button>
      </div>
    </Modal>
  )
}

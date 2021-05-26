import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import './TagInput.scss';

export default function TagInput({ initTags, onChange }) {
  const [state, setState] = useState({
    tags: initTags || [],
    inputVisible: false,
    inputValue: '',
    editInputIndex: -1,
    editInputValue: '',
  });

  const input = useRef();
  const editInput = useRef();

  const handleClose = removedTag => {
    const tags = state.tags.filter(tag => tag !== removedTag);
    onChange(tags);
    setState({ ...state, tags });
  };

  const showInput = () => {
    setState({ ...state, inputVisible: true });
  };

  const handleInputChange = e => {
    setState({ ...state, inputValue: e.target.value });
  };

  const handleInputConfirm = () => {
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    onChange(tags);
    setState({
      ...state,
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  const handleEditInputChange = e => {
    setState({ ...state, editInputValue: e.target.value });
  };

  const handleEditInputConfirm = () => {
    const newTags = [...state.tags];
    newTags[state.editInputIndex] = state.editInputValue;

    setState({
      ...state,
      tags: newTags,
      editInputIndex: -1,
      editInputValue: '',
    })
  };

  const saveInputRef = _input => {
    input.current = _input;
  };

  const saveEditInputRef = _input => {
    editInput.current = _input;
  };

  useEffect(() => {
    if (state.inputVisible && input.current) {
      input.current.focus();
    }
  }, [state.inputVisible]);

  useEffect(() => {
    if (editInput.current) {
      editInput.current.focus();
    }
  }, [state.editInputIndex, state.editInputValue]);

  return (
    <div className="app-tag-input">
      {state.tags.map((tag, index) => {
        if (state.editInputIndex === index) {
          return (
            <Input
              ref={saveEditInputRef}
              key={tag}
              size="small"
              className="tag-input"
              value={state.editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }

        const isLongTag = tag.length > 20;

        const tagElem = (
          <Tag
            className="edit-tag"
            key={tag}
            closable={index >= 0}
            onClose={() => handleClose(tag)}
          >
            <span
              onDoubleClick={e => {
                if (index !== 0) {
                  setState({ ...state, editInputIndex: index, editInputValue: tag });
                  e.preventDefault();
                }
              }}
            >
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </span>
          </Tag>
        );
        return isLongTag ? (
          <Tooltip title={tag} key={tag}>
            {tagElem}
          </Tooltip>
        ) : (
          tagElem
        );
      })}
      {state.inputVisible && (
        <Input
          ref={saveInputRef}
          type="text"
          size="small"
          className="tag-input"
          value={state.inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!state.inputVisible && (
        <Tag className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> Thẻ mới
        </Tag>
      )}
    </div>
  );
}

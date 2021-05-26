import { Card } from 'antd';
import React from 'react'
import './PostedStatus.scss';
import { format } from 'timeago.js';
import parse from 'html-react-parser';
import ImageUploadPreview from '../ImageUploadPreview';

export default function PostedStatus({ data }) {
  return (
    <Card className="app-posted-status">
      <div className="app-posted-status__header">
        {`Vào lúc ${format(new Date(data.createdAt), 'vi')} • Tại ${data.location}`}
      </div>
      <div className="app-posted-status__body">
        {parse(data.content)}
      </div>
      <div className="app-posted-status__photos">
        <ImageUploadPreview mediaSources={data.mediaFiles} />
      </div>
    </Card>
  )
}

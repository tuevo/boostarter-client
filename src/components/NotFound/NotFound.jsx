import { Result, Button } from 'antd'
import React from 'react'
import { useHistory } from 'react-router'
import './NotFound.scss';

export default function NotFound() {
    const history = useHistory();
    return (
        <div className="app-not-found">
            <Result
                status="404"
                title="404"
                subTitle="Xin lỗi, trang này không tồn tại."
                extra={<Button type="primary" onClick={() => history.push('/')}>Trở về trang chủ</Button>}
            />
        </div>
    )
}

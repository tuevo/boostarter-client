import React from 'react'
import './AppLoading.scss';
import logo from '../../assets/images/logo.png';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { APP_NAME } from '../../constants';

export default function AppLoading() {
    return (
        <div className="app-loading">
            <div className="app-loading__spinner"><Spin indicator={<LoadingOutlined spin />} /></div>
            <img className="app-loading__logo" src={logo} alt="boostarter" />
            <Title className="app-loading__name" level={3}>{APP_NAME}</Title>
        </div>
    )
}

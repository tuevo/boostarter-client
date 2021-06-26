import { Avatar, List } from 'antd';
import React from 'react';
import './AppLogo.scss';
import logo from '../../assets/images/logo.png';
import { APP_NAME, APP_SLOGAN } from '../../constants';

export default function AppLogo() {
    return (
        <div className="app-logo">
            <List.Item.Meta
                avatar={<Avatar shape="square" src={logo} size={40} />}
                title={APP_NAME}
                description={APP_SLOGAN}
            />
        </div>
    )
}

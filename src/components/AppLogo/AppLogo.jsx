import { Avatar, List } from 'antd';
import React from 'react';
import './AppLogo.scss';
import logo from '../../assets/images/logo.png';

export default function AppLogo() {
  return (
    <div className="app-logo">
      <List.Item.Meta
        avatar={<Avatar shape="square" src={logo} size={40} />}
        title="Boostarter"
        description="Nền tảng gây quỹ"
      />
    </div>
  )
}

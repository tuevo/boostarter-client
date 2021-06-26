import React from 'react';
import { InputNumber } from 'antd';
import './BetterInputNumber.scss';

export default class BetterInputNumber extends React.Component {
    render() {
        if (this.props.addonAfter) {
            return (
                <div className="better-input-number">
                    <InputNumber style={{ verticalAlign: 'middle', borderBottomRightRadius: 0, borderTopRightRadius: 0 }} {...this.props} />
                    <div className="ant-input-group-addon" style={{ paddingTop: '2px', verticalAlign: 'middle', display: 'inline-table', lineHeight: '24px', height: '32px' }}>{this.props.addonAfter}</div>
                </div>
            );
        } else {
            return (
                <div className="better-input-number">
                    <InputNumber {...this.props} />
                </div>
            );
        }
    }
}
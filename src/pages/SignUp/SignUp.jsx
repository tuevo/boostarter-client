import { QuestionCircleOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Divider, Form, Input, message, Radio, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from '../../components/Container';
import { mapUserRole, userRole } from '../../constants';
import { useScrollTop } from '../../hooks';
import { newUser } from '../../mock-data';
import { addUser } from '../../redux/reducers/user';
import './SignUp.scss';

export default function SignUp(props) {
    useScrollTop();
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = useForm();
    const users = useSelector(state => state.user.users);

    const onFinished = (values) => {
        const { fullName, email, password, retype, roleId, privacyChecked } = values;
        if (password !== retype) {
            message.error('Mật khẩu nhập lại không khớp');
            return;
        }

        if (!privacyChecked) {
            message.error('Vui lòng đồng ý với Các khoản sử dụng');
            return;
        }

        const index = users.findIndex((u) => u.email === email);
        if (index > -1) {
            message.error('Địa chỉ email này đã được đăng ký');
            return;
        }

        const _newUser = {
            ...newUser,
            fullName, email, password, role: mapUserRole(roleId)
        };
        dispatch(addUser(_newUser));
        message.success('Tạo tài khoản thành công');

        history.push({
            pathname: '/sign-in',
            state: props.location.state,
        });
    }

    const onFinishFailed = () => {
        message.error('Đăng nhập thất bại');
    }

    return (
        <div className="sign-up">
            <Container>
                <div className="sign-up__content">
                    <div className="sign-up__left">
                        <img src="https://image.freepik.com/free-vector/crowdfunding-abstract-concept-vector-illustration-crowdsourcing-project-alternative-financing-raise-money-internet-fundraising-platform-collect-donations-business-venture-abstract-metaphor_335657-2904.jpg" alt="" />
                    </div>
                    <div className="sign-up__right">
                        <QueueAnim delay={150}>
                            <div key="card">
                                <Card>
                                    <div className="sign-up__title">
                                        <Title level={2}>Đăng ký tài khoản</Title>
                                    </div>
                                    <Form
                                        form={form}
                                        labelAlign="left"
                                        labelCol={{ span: 8 }}
                                        onFinish={onFinished}
                                        onFinishFailed={onFinishFailed}
                                        initialValues={{ roleId: userRole.CAMPAIGN_OWNER.value }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Form.Item
                                                label="Loại tài khoản"
                                                name="roleId"
                                                style={{ flexGrow: 1 }}
                                            >
                                                <Radio.Group>
                                                    {[userRole.CAMPAIGN_OWNER, userRole.DONATOR].map((r) => (
                                                        <Radio key={r.value} value={r.value}>{r.name}</Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                            <div style={{ marginBottom: 20 }}>
                                                <Tooltip placement="right" title="Nhấn để tìm hiểu thêm về các loại tài khoản">
                                                    <Button
                                                        icon={<QuestionCircleOutlined />}
                                                        shape="circle"
                                                        style={{ border: 0 }}
                                                    />
                                                </Tooltip>
                                            </div>

                                        </div>
                                        <div style={{ marginLeft: -2.5 }}>
                                            <Form.Item
                                                label="Họ và tên"
                                                name="fullName"
                                                rules={[
                                                    { required: true, message: 'Vui lòng họ và tên' },
                                                ]}
                                            >
                                                <Input autoFocus placeholder="Nguyễn Văn A" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Địa chỉ email"
                                                name="email"
                                                rules={[
                                                    { required: true, type: 'email', message: 'Vui lòng nhập địa chỉ email' },
                                                ]}
                                            >
                                                <Input placeholder="abc@example.com" />
                                            </Form.Item>
                                            <Form.Item
                                                label="Mật khẩu"
                                                name="password"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập mật khẩu'
                                                    },
                                                    {
                                                        min: 5,
                                                        max: 30,
                                                        message: 'Mật khẩu phải từ 5 đến 30 ký tự'
                                                    }
                                                ]}
                                            >
                                                <Input.Password
                                                    onKeyUp={e => {
                                                        if (e.keyCode === 13) {
                                                            form.submit();
                                                        }
                                                    }}
                                                    placeholder="Không quá 30 ký tự"
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                label="Nhập lại mật khẩu"
                                                name="retype"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Vui lòng nhập lại mật khẩu'
                                                    },
                                                    {
                                                        min: 5,
                                                        max: 30,
                                                        message: 'Mật khẩu phải từ 5 đến 30 ký tự'
                                                    }
                                                ]}
                                            >
                                                <Input.Password
                                                    onKeyUp={e => {
                                                        if (e.keyCode === 13) {
                                                            form.submit();
                                                        }
                                                    }}
                                                    placeholder="Không quá 30 ký tự"
                                                />
                                            </Form.Item>
                                        </div>
                                        <button type="submit" hidden />
                                        <Form.Item name="privacyChecked">
                                            <Checkbox
                                                onChange={e => form.setFieldsValue({ privacyChecked: e.target.checked })}
                                            >
                                                Tôi đồng ý với <Button type="link">Các điều khoản sử dụng</Button>
                                            </Checkbox>
                                        </Form.Item>
                                        <Button
                                            className="sign-up__btn-submit"
                                            type="primary"
                                            size="large"
                                            onClick={() => form.submit()}
                                        >
                                            Đăng ký
                                        </Button>
                                    </Form>
                                    <Divider>Hoặc</Divider>
                                    <div className="sign-up__footer">
                                        <Button
                                            className="sign-up__btn-create-account"
                                            type="primary"
                                            size="large"
                                            onClick={() => history.push('/sign-in')}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </QueueAnim>
                    </div>
                </div>
            </Container>
        </div>
    )
}

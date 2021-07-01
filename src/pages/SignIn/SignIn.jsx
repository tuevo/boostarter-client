import { Button, Card, Checkbox, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Container from '../../components/Container';
import { AUTH_USER } from '../../constants';
import { useScrollTop } from '../../hooks';
import { auth } from '../../redux/reducers/user';
import './SignIn.scss';

export default function SignIn(props) {
    useScrollTop();
    const history = useHistory();
    const dispatch = useDispatch();
    const [form] = useForm();
    const users = useSelector(state => state.user.users);

    const onFinished = (values) => {
        const { email, password } = values;
        const index = users.findIndex((u) => u.email === email && u.password === password);
        if (index < 0) {
            message.error('Địa chỉ email hoặc mật khẩu không chính xác');
            return;
        }

        const authUser = users[index];
        localStorage.setItem(AUTH_USER, JSON.stringify(authUser));
        dispatch(auth(authUser));

        if (props.location.state) {
            const { from } = props.location.state;
            if (from !== '/sign-up') {
                history.push(from);
                return;
            }
        }

        history.push('/');
    }

    const onFinishFailed = () => {
        message.error('Đăng nhập thất bại');
    }

    return (
        <div className="sign-in">
            <Container>
                <div className="sign-in__content">
                    <div className="sign-in__left">
                        <img src="https://www.gpslink.co.uk/static/assets/img/login.png" alt="" />
                    </div>
                    <div className="sign-in__right">
                        <QueueAnim delay={150}>
                            <div key="card">
                                <Card>
                                    <div className="sign-in__title">
                                        <Title level={2}>Đăng nhập tài khoản</Title>
                                    </div>
                                    <Form
                                        form={form}
                                        labelAlign="left"
                                        labelCol={{ span: 6 }}
                                        onFinish={onFinished}
                                        onFinishFailed={onFinishFailed}
                                    >
                                        <Form.Item
                                            label="Địa chỉ email"
                                            name="email"
                                            rules={[{
                                                required: true,
                                                message: 'Vui lòng nhập địa chỉ email'
                                            }]}
                                        >
                                            <Input autoFocus />
                                        </Form.Item>
                                        <Form.Item
                                            label="Mật khẩu"
                                            name="password"
                                            rules={[{
                                                required: true,
                                                message: 'Vui lòng nhập mật khẩu'
                                            }]}
                                        >
                                            <Input.Password />
                                        </Form.Item>
                                        <button type="submit" hidden />
                                        <div className="sign-in__before-submit">
                                            <Checkbox>Lưu tài khoản</Checkbox>
                                            <Button type="link">Quên mật khẩu?</Button>
                                        </div>
                                        <Button
                                            className="sign-in__btn-submit"
                                            type="primary"
                                            size="large"
                                            onClick={() => form.submit()}
                                        >
                                            Đăng nhập
                                        </Button>
                                    </Form>
                                    <Divider>Hoặc</Divider>
                                    <div className="sign-in__footer">
                                        <Button
                                            className="sign-in__btn-create-account"
                                            type="primary"
                                            size="large"
                                            onClick={() => history.push({
                                                pathname: '/sign-up',
                                                state: props.location.state,
                                            })}
                                        >
                                            Tạo tài khoản mới
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

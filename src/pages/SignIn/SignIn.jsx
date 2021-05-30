import { Button, Card, Checkbox, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Container from '../../components/Container';
import { AUTH_USER } from '../../constants';
import { useScrollTop } from '../../hooks';
import { mockUser1, mockUser2, mockUser4 } from '../../mock-data';
import { auth } from '../../redux/reducers/user';
import './SignIn.scss';
import QueueAnim from 'rc-queue-anim';

export default function SignIn(props) {
  useScrollTop();
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = useForm();

  const onFinished = (values) => {
    const { email, password } = values;
    const correctPassword = '123456';
    if (
      email !== ['admin@gmail.com', 'owner@gmail.com', 'donator@gmail.com']
      && password !== correctPassword
    ) {
      message.error('Tài khoản hoặc mật khẩu không chính xác');
      return;
    }

    let user;

    switch (values.email) {
      case 'admin@gmail.com':
        user = mockUser2;
        break;
      case 'owner@gmail.com':
        user = mockUser1;
        break;
      case 'donator@gmail.com':
        user = mockUser4;
        break;
      default:
        break;
    }

    localStorage.setItem(AUTH_USER, JSON.stringify(user));
    dispatch(auth(user));

    if (props.location.state) {
      const { from } = props.location.state;
      history.push(from);
    }
  }

  const onFinishFailed = () => {
    message.error('Đăng nhập thất bại');
  }

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      form.submit();
    }
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
                      <Input autoFocus onKeyUp={handleKeyUp} />
                    </Form.Item>
                    <Form.Item
                      label="Mật khẩu"
                      name="password"
                      rules={[{
                        required: true,
                        message: 'Vui lòng nhập mật khẩu'
                      }]}
                    >
                      <Input.Password onKeyUp={handleKeyUp} />
                    </Form.Item>
                    <div className="sign-in__before-submit">
                      <Checkbox>Lưu tài khoản</Checkbox>
                      <NavLink to="/">Quên mật khẩu?</NavLink>
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

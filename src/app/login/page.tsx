'use client';

import { useLogin } from '@/api/authApi';
import { ParamsLogin } from '@/api/registerApi';
import { loggedState } from '@/recoil/logginState';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';

export default function Register() {
  const cookie = new Cookies();
  const router = useRouter();
  const [form] = Form.useForm();
  const [logged, setLogged] = useRecoilState(loggedState);

  const { mutate: login, isPending } = useLogin();

  const onFinish = (values: ParamsLogin) => {
    login(values, {
      onSuccess: (response: any) => {
        toast.success('Đăng nhập thành công');
        router.push('/');
        cookie.set('JWT', response?.access_token);
        setLogged(true);
        localStorage.setItem('logged', 'true');
      },
      onError: (error: any) => {
        toast.error('Đăng nhập thất bại');
      },
    });
  };

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Đăng nhập tài khoản</h2>

          <Form
            form={form}
            name='register_form'
            className='login-form'
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name='username'
              rules={[
                { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                { min: 4, message: 'Tên đăng nhập phải có ít nhất 4 ký tự' },
              ]}
            >
              <Input
                prefix={<UserOutlined className='site-form-item-icon' />}
                placeholder='Tên đăng nhập'
                disabled={isPending}
              />
            </Form.Item>

            <Form.Item
              name='password'
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu!' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className='site-form-item-icon' />}
                placeholder='Mật khẩu'
                disabled={isPending}
              />
            </Form.Item>

            <div className='flex flex-col gap-4 mt-6'>
              <Button type='primary' htmlType='submit' className='w-full' loading={isPending}>
                {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>

              <div className='text-center'>
                <Link href='/register' className='text-blue-600 hover:text-blue-800'>
                  Đăng ký
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

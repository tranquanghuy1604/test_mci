'use client';

import { useRegister } from '@/api/authApi';
import { ParamsLogin } from '@/api/registerApi';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Register() {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutate: register, isPending } = useRegister();

  const onFinish = (values: ParamsLogin) => {
    register(values, {
      onSuccess: (response) => {
        toast.success('Đăng ký tài khoản thành công!');
        router.push('/login');
      },
      onError: (error: any) => {
        message.error(error?.response?.data?.message || 'Có lỗi xảy ra khi đăng ký');
      },
    });
  };

  return (
    <div>
      <div className='flex items-center justify-center min-h-screen bg-gray-100'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h2 className='text-2xl font-bold mb-6 text-center'>Đăng ký tài khoản</h2>

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
                {isPending ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>

              <div className='text-center'>
                Đã có tài khoản?{' '}
                <Link href='/login' className='text-blue-600 hover:text-blue-800'>
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

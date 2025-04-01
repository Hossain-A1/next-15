"use client";
import axios from "axios";
import { Card, Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const handleLogin = async (v) => {
    try {
      await axios.post("/api/login", v, {
        "Content-Type": "application/json",
      });

      router.push('/admin');
    } catch (err) {
      message.error(err.response?.data.message || err.message);
    }
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <Card hoverable className='w-6/12'>
        <h1 className='text-2xl font-semibold mb-4'>Login now</h1>

        <Form layout='vertical' onFinish={handleLogin}>
          <Form.Item label='Emial' name='email' rules={[{ required: true }]}>
            <Input size='large' placeholder='example@gmail.com' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true }]}
          >
            <Input size='large' type='password' placeholder='Abc123!!' />
          </Form.Item>
          <Form.Item>
            <Button size='large' htmlType='submit' type='primary'>
              Signin
            </Button>
          </Form.Item>
        </Form>

        <div className='flex items-center gap-2'>
          <label>Don't have an account ?</label>
          <Link href='/signup' className='text-blue-600 font-medium'>
            {" "}
            Register now{" "}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;

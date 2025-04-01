"use client";
import { Card, Button, Form, Input, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Signup = () => {
  const router = useRouter();
  const handleSignup = async (v) => {
    try {
      await axios.post("/api/signup", v, {
        "Content-Type": "application/json",
      });

    router.push("/login");
    } catch (err) {
      message.error(err.response.data.message || err.message);
    }
  };

  return (
    <div className='flex h-screen justify-center items-center'>
      <Card hoverable className='w-6/12'>
        <h1 className='text-2xl font-semibold mb-4'>Register now</h1>

        <Form layout='vertical' onFinish={handleSignup}>
          <Form.Item
            label='Fullname'
            name='fullname'
            rules={[{ required: true }]}
          >
            <Input size='large' placeholder='Er Hero' />
          </Form.Item>
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
              Signup
            </Button>
          </Form.Item>
        </Form>

        <div className='flex items-center gap-2'>
          <label>Already have an account ?</label>
          <Link href='/login' className='text-blue-600 font-medium'>
            {" "}
            Login now{" "}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Signup;

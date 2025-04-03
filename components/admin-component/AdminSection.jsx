"use client";
import useFetch from "@/lib/swr";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";

const AdminSection = () => {
  const [form] = Form.useForm();
  const [isUpId, setIsUpId] = useState(null);
  const { data: blogs, isLoading, error } = useFetch("/api/blog");
  const handleCreateBlog = async (v) => {
    try {
      await axios.post("/api/blog", v, {
        "Content-Type": "application/json",
      });
      mutate("/api/blog");
      form.resetFields();
    } catch (error) {
      message.error(error.response.data.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/blog/${id}`);
      mutate("/api/blog");
    } catch (error) {
      message.error(error.message);
    }
  };

  const update = (data) => {
    form.setFieldsValue(data);
    setIsUpId(data._id);
  };

  const handleSaveBlog = async (data) => {
    try {
      await axios.put(`/api/blog/${isUpId}`, data, {
        "Content-Type": "application/json",
      });
      mutate("/api/blog");
      form.resetFields();
      setIsUpId(null);
    } catch (error) {
      message.error(error.message);
    }
  };

  if (isLoading) {
    return <p>Loadin...</p>;
  }
  if (error) {
    return <p className='text-red-700 text-xl'>{error.message}</p>;
  }
  return (
    <div className='grid grid-cols-12 gap-12'>
      <div className='col-span-7'>
        <h1 className='text-4xl font-bold'>New Blog</h1>

        <Form
          layout='vertical'
          onFinish={isUpId ? handleSaveBlog : handleCreateBlog}
          form={form}
        >
          <Form.Item label='Title' name='title' rules={[{ required: true }]}>
            <Input size='large' placeholder='Inter blog title here' />
          </Form.Item>
          <Form.Item
            label='Description'
            name='description'
            rules={[{ required: true }]}
          >
            <Input.TextArea
              size='large'
              placeholder='Inter blog Description here'
              rows={10}
            />
          </Form.Item>

          <Form.Item>
            {isUpId ? (
              <Button type='default' htmlType='submit' size='large'>
                Update
              </Button>
            ) : (
              <Button type='primary' htmlType='submit' size='large'>
                Create Blog
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>

      <div className='col-span-5 space-y-6 '>
        {blogs &&
          blogs.map((blog) => (
            <div key={blog._id}>
              <Card
                hoverable
                actions={[
                  <EditOutlined key='edit' onClick={() => update(blog)} />,
                  <DeleteOutlined
                    key='delete'
                    onClick={() => handleDelete(blog._id)}
                  />,
                ]}
              >
                <h1 className='text-xl capitalize font-medium'>{blog.title}</h1>
                <p className='text-gray-500 text-sm'>
                  {blog.description.slice(0, 100)}
                </p>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AdminSection;

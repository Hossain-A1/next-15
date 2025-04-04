"use client";
import { Card } from "antd";
import React from "react";

const Blog = ({ blogs }) => {
  return (
    <div className='w-8/12 mx-auto space-y-8'>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <Card hoverable>
            <h1 className='capitalize text-2xl font-semibold'>{blog.title}</h1>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Blog;

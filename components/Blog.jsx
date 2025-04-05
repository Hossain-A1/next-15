"use client";
import { Card } from "antd";
import Link from "next/link";
import React from "react";

const Blog = ({ blogs }) => {
  return (
    <div className='w-8/12 mx-auto space-y-8'>
      {blogs.length>0&& blogs.map((blog) => (
        <Link className="block" href={`/blog/${blog.title.split(" ").join("-")}`} key={blog._id}>
          <Card hoverable>
            <h1 className='capitalize text-2xl font-semibold'>{blog.title}</h1>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default Blog;

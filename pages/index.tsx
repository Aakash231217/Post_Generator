import React, { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import { Post } from '../types';

const fetchPosts = async () => {
  // This function should fetch posts from an API endpoint
  const response = await fetch('/api/fetch-posts');
  const data: Post[] = await response.json();
  return data;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    getPosts();
  }, []);

  const handleSubmit = (newPost: Post) => {
    setPosts([...posts, newPost]);
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Social Media Post Generator</h1>
      <PostForm onSubmit={handleSubmit} />
      <PostList posts={posts} />
    </div>
    </>
  );
}

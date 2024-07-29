import React from 'react';
import { Post } from '../types';

interface PostListProps {
  posts: Post[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Generated Posts</h2>
      {posts.map((post, index) => (
        <div key={index} className="mb-4 p-4 border rounded">
          <p className="text-sm text-gray-500">{post.timestamp}</p>
          <p className="font-bold">Prompt: {post.prompt}</p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;
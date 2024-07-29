import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (prompt: string) => Promise<void>;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      await onSubmit(prompt);
      setPrompt('');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt for your social media post"
        className="w-full p-2 border rounded"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? 'Generating...' : 'Generate Post'}
      </button>
    </form>
  );
};

export default PostForm;
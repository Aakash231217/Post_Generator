import { NextApiRequest, NextApiResponse } from 'next';
import { fetchPosts } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const posts = await fetchPosts();
    const formattedPosts = posts.map(([timestamp, prompt, content]) => ({
      timestamp,
      prompt,
      content,
    }));
    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error('Error in fetch-posts API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
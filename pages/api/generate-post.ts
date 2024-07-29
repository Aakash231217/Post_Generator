import { NextApiRequest, NextApiResponse } from 'next';
import { generatePost } from '../../lib/openai';
import { addRowToSheet } from '../../lib/googleSheets';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const post = await generatePost(prompt);
    await addRowToSheet(prompt, post);
    res.status(200).json({ message: 'Post generated and saved successfully' });
  } catch (error) {
    console.error('Error in generate-post API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
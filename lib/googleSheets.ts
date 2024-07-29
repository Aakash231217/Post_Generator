import axios from 'axios';

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

async function getAccessToken(): Promise<string> {
  const response = await axios.post(GOOGLE_TOKEN_URL, {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    grant_type: 'refresh_token',
  });

  return response.data.access_token;
}

export async function addRowToSheet(prompt: string, post: string): Promise<void> {
  try {
    const accessToken = await getAccessToken();
    const timestamp = new Date().toISOString();

    await axios.post(
      `${GOOGLE_SHEETS_API_URL}/${process.env.SPREADSHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED`,
      {
        values: [[timestamp, prompt, post]],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error adding row to sheet:', error);
    throw new Error('Failed to add row to sheet');
  }
}

export async function fetchPosts(): Promise<any[]> {
  try {
    const accessToken = await getAccessToken();

    const response = await axios.get(
      `${GOOGLE_SHEETS_API_URL}/${process.env.SPREADSHEET_ID}/values/Sheet1!A2:C`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.values || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}
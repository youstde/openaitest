import { ChatGPTAPI } from 'chatgpt';

const api = new ChatGPTAPI({ apiKey: process.env.OPENAI_API_KEY })

export default async function (req, res) {
  const text = req.body.text || '';
  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid text",
      }
    });
    return;
  }
  try {
    let res = await api.sendMessage('What is OpenAI?')
    console.log(res.text);
    res.status(200).json({ result: res.text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}
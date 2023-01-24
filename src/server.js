import Express from 'express';
import { chatGpt } from './ChatGpt.js';

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.post('/ask', async (req, res) => {
  try {
    // {
    //   "message": "Hello, how are you today?",
    //   "conversationId": "your-conversation-id (optional)",
    //   "parentMessageId": "your-parent-message-id (optional)"
    // }
    const { message, conversationId, parentMessageId } = req.body;
    const result = await chatGpt.sendMessage(
      message,
      conversationId,
      parentMessageId
    );
    console.log(result);

    res.send(result);
  } catch (error) {
    console.log(error);
    res.send('Something was wrong');
  }
});

export { app };

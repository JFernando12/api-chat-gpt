import Express from 'express';
import { chatGpt, resetSessionChatGpt } from './ChatGpt.js';

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

    if (chatGpt.healthy) {
      const result = await chatGpt.sendMessage(
        message,
        conversationId,
        parentMessageId
      );

      console.log(result);
      res.send(result);
    } else {
      res.send('Chat-gpt se está reiniciando...');
    }
  } catch (error) {
    console.log(error);
    chatGpt.healthy = false;
    res.send('Something was wrong');
  }
});

export { app };

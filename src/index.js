import { app } from './server.js';
import { chatGpt, resetSessionChatGpt } from './ChatGpt.js';

chatGpt.initSession().then(() => {
  console.log('Se inicio sesion en chat-gpt');
});

// call `api.refreshSession()` every 30 minutes to refresh the session
setInterval(() => {
  chatGpt.refreshSession().then(() => {
    console.log(`Session refreshed for account.`);
  });
}, 30 * 60 * 1000);

// call `api.resetSession()` every 24 hours to reset the session
setInterval(async () => {
  await resetSessionChatGpt();
}, 24 * 60 * 60 * 1000);

setInterval(async () => {
  if (!chatGpt.restarting && !chatGpt.healthy && chatGpt.started) {
    await resetSessionChatGpt();
  } else if (chatGpt.restarting) {
    console.log('Reinicio de chat-gtp en curso...');
  } else {
    console.log('Chatgpt saludable...');
  }
}, 10 * 1000);

app.listen(3000, () => {
  console.log('Server on port 3000');
});

export { chatGpt };

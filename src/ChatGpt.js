import { ChatGPTAPIBrowser } from 'chatgpt';
import { OPENIA_PASSWORD, OPENIA_EMAIL } from '../EnvironmentVariables.js';

class ChatGpt {
  api = new ChatGPTAPIBrowser({
    email: OPENIA_EMAIL,
    password: OPENIA_PASSWORD,
    isGoogleLogin: true,
    debug: false,
    minimize: true,
  });

  async initSession() {
    await this.api.initSession();
  }

  async closeSession() {
    await this.api.closeSession();
  }

  async sendMessage(message, conversationId, parentMessageId) {
    console.log(message, conversationId, parentMessageId);
    const result = await this.api.sendMessage(message, {
      timeoutMs: 1 * 60 * 1000,
      conversationId,
      parentMessageId,
    });
    return result;
  }

  async refreshSession() {
    await this.api.refreshSession();
  }

  async closeSession() {
    await this.api.closeSession();
  }
}

let chatGpt = new ChatGpt();

const resetSessionChatGpt = async () => {
  await chatGpt.closeSession();
  console.log('Cerrando sesion');

  // Se crea nueva instancia de la clase para borra todos los cookies Session y evitar errores.
  chatGpt = new ChatGpt();

  // Se intentara iniciar sesion hasta 5 veces,
  // en caso de fallar mas de 5 veces, se notificara por WhatsApp el error.
  let i = 0;
  while (i < 5) {
    try {
      console.log('Creando nueva sesion');

      await chatGpt.initSession();
      console.log('Se inicio sesion en chat-gpt');
      i = 5;
    } catch (error) {
      console.log(error);
      i++;
    }
  }
};

export { chatGpt, resetSessionChatGpt };

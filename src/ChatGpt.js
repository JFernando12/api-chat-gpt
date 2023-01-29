import { ChatGPTAPIBrowser } from 'chatgpt';
import { OPENIA_PASSWORD, OPENIA_EMAIL } from '../EnvironmentVariables.js';

class ChatGpt {
  api = new ChatGPTAPIBrowser({
    email: OPENIA_EMAIL,
    password: OPENIA_PASSWORD,
    isGoogleLogin: true,
    proxyServer: '201.150.118.34:999',
  });

  started = false;
  healthy = false;
  refreshing = false;
  restarting = false;

  async initSession() {
    await this.api.initSession();
    console.log('Se inicio sesion en chat-gpt');
    this.started = true;
    this.healthy = true;
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
    this.refreshing = true;
    await this.api.refreshSession();
    this.refreshing = false;
  }

  async closeSession() {
    await this.api.closeSession();
  }
}

let chatGpt = new ChatGpt();

const resetSessionChatGpt = async () => {
  // Se pone flag para indicar que está en mantenimiento
  console.log('Reiniciando chat-gpt...');
  chatGpt.restarting = true;

  console.log('Cerrando sesion');
  await chatGpt.closeSession();

  // Se crea nueva instancia de la clase para borra todos los cookies Session y evitar errores.
  chatGpt = new ChatGpt();

  // Se intentara iniciar sesion hasta 5 veces,
  // en caso de fallar mas de 5 veces, se notificara por WhatsApp el error.
  let i = 0;
  while (i < 5) {
    try {
      console.log('Creando nueva sesion');
      await chatGpt.initSession();
      i = 5;
    } catch (error) {
      chatGpt.healthy = false;
      console.log(error);
      i++;
    }
  }

  chatGpt.restarting = false;
};

export { chatGpt, resetSessionChatGpt };

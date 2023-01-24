import { config } from 'dotenv';
config();

const OPENIA_EMAIL = process.env.OPENIA_EMAIL;
const OPENIA_PASSWORD = process.env.OPENIA_PASSWORD;

export { OPENIA_EMAIL, OPENIA_PASSWORD };

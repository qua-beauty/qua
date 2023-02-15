import {Application, Router} from 'https://deno.land/x/oak/mod.ts';
import {oakCors} from 'https://deno.land/x/cors/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';

import {bot, runBot} from './bot/bot.js';

const app = new Application();
const router = new Router();

runBot();

router.get('/', async (context) => {
  context.response.body = "Hello, oak!";
})

router.post('/answerWebAppQuery', async (context) => {
  const payload = await context.request.body().value;
  console.log(payload);
  try {
    context.response.body = await bot.api.answerWebAppQuery(payload);
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = 'Error processing the request';
  }
});

app.use(oakCors({
  origin: "http://localhost:5137",
  methods: ['GET', 'PUT', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(router.allowedMethods());
app.use(router.routes());

await app.listen({port: 8000});
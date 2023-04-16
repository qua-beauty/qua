import {Application, Router} from 'https://deno.land/x/oak/mod.ts';
import {webhookCallback} from 'https://deno.land/x/grammy/mod.ts';
import {run} from 'https://deno.land/x/grammy_runner@v1.0.4/mod.ts';
import {oakCors} from 'https://deno.land/x/cors/mod.ts';
import 'https://deno.land/x/dotenv/load.ts';
import {bot} from './bot/bot.js';
import {posterCallback} from './posterpos/posterCallback.ts';

const app = new Application();
const router = new Router();

router.get('/', async (context) => {
  context.response.body = 'Hello, oak!';
});

router.post('/answerWebAppQuery', async (context) => {
  const {queryId, ...data} = await context.request.body().value;

  try {
    context.response.body = await bot.api.answerWebAppQuery(queryId, data);
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = 'Error processing the request';
  }
});

router.post('/poster-webhook', async (context) => {
  const data = await context.request.body().value;

  try {
    await posterCallback(data);
    context.response.status = 200;
    context.response.body = 'OK';
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = 'Error processing the request';
  }
});

app.use(oakCors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin']
}));

app.use(router.allowedMethods());
app.use(router.routes());

if (Deno.env.get('IS_DEV')) {
  run(bot);
} else {
  app.use(webhookCallback(bot, 'oak'));
}


await app.listen({port: 8000});
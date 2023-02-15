import {Application, Router} from 'https://deno.land/x/oak/mod.ts';
import {oakCors} from 'https://deno.land/x/cors/mod.ts';
import {runBot} from './bot/bot.js';

const app = new Application();
const router = new Router();

runBot();

router.post('/answerWebAppQuery', async (context) => {
  console.log(context.request.body());

  const payload = await context.request.body().value;
  try {
    context.response.body = await bot.api.answerWebAppQuery(payload);
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = 'Error processing the request';
  }
});

app.use(oakCors({
  origin: 'https://swamimarket.netlify.app/',
}));
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({port: 8000});
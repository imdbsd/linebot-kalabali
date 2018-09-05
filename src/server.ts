import Koa from 'koa';
import Router from 'koa-router';
import Line from './service/Line';

const app = new Koa();
const router = new Router();

router.get('/*',async (ctx) => {
    ctx.body = 'KalaBali - Dari Semeton, Untuk Semeton'
})

router.post('/callback', async (ctx) => {
   const auth = await Line.authentication(ctx)

   if(auth.isValid) {
       ctx.status = 200
   } else {
       ctx.status = 401
   }
})

app.use(router.routes());
app.listen(3000);

console.log('Server running in port 3000');
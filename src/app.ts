import express from 'express';
import orderRouter from './handlers/order';
import productRouter from './handlers/product';
import userRouter from './handlers/user';

const app = express();
const PORT = 3000;

app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);

app.listen(PORT, () => {
  console.log(`Server started at 127.0.0.1:${PORT}`);
});


export default app;
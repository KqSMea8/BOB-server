import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;

  router.redirect('/', '/index.html');

  router.post('/api/customer/exist', controller.customer.exist);
  router.get('/api/customer/getInfo', controller.customer.getInfo);
  router.get(
    '/api/customer/getProductInfo',
    controller.customer.getProductInfo,
  );

  // socket.io
  io.of('/').route('message', io.controller.default.message);
};

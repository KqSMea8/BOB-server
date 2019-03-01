import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, io } = app;

  router.redirect('/', '/index.html');

  router.post('/api/customer/exist', controller.customer.exist);
  router.get('/api/customer/getInfo', controller.customer.getInfo);

  // socket.io
  io.of('/').route('message', io.controller.default.message);
};

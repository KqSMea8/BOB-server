import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.redirect('/', '/index.html');

  router.post('/api/customer/exist', controller.customer.exist);
  router.get('/api/customer/getInfo', controller.customer.getInfo);
};

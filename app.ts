import { Application } from 'egg';
module.exports = (app: Application) => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    // 也可以通过以下方式来调用 Service
    // const ctx = app.createAnonymousContext();
    // app.cities = await ctx.service.cities.load();
    // app.model.sync({ force: true });
  });
};

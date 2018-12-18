import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async exist() {
    const { ctx } = this;
    const { chName, certNo } = ctx.request.body;
    const cust = await ctx.service.customer.findOne({
      where: {
        ch_name: chName,
        cert_no: certNo,
      },
    });
    ctx.body = {
      status: 0,
      data: !!cust,
    };
  }

  public async getInfo() {
    const { ctx } = this;
    const { custCoreNo } = ctx.request.query;
    const cust = await ctx.service.customer.findOne({
      where: {
        cust_core_no: custCoreNo,
      },
    });
    if (!cust) {
      ctx.body = {
        status: 1,
        message: 'no cust found!',
      };
    }
    ctx.body = {
      status: 0,
      data: await ctx.service.customer.getInfo(custCoreNo),
    };
  }
}

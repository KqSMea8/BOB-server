import { Controller } from 'egg';

export default class extends Controller {
  public async exist() {
    const { ctx } = this;
    const errors = this.app.validator.validate(
      { chName: 'string', certNo: 'string' },
      ctx.request.body,
    );
    if (errors) {
      ctx.body = {
        status: 1,
        message: errors,
      };
      return;
    }
    const { chName, certNo } = ctx.request.body;
    const cust = await ctx.service.customer.findOne({
      where: {
        ch_name: chName,
        cert_no: certNo,
      },
    });
    ctx.body = {
      status: cust ? 0 : 1,
      data: cust ? cust : false,
    };
  }

  public async getInfo() {
    const { ctx } = this;
    const { custCoreNo } = ctx.request.query;
    const errors = this.app.validator.validate(
      { custCoreNo: 'string' },
      ctx.request.query,
    );
    if (errors) {
      ctx.body = {
        status: 1,
        message: errors,
      };
      return;
    }
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
      return;
    }
    ctx.body = {
      status: 0,
      data: await ctx.service.customer.getInfo(custCoreNo),
    };
  }
}

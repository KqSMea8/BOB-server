import { Service } from 'egg';

/**
 * Customer Service
 */
export default class Customer extends Service {
  public async findOne(options) {
    const { CustInfo } = this.app.model;
    return CustInfo.findOne(options);
  }

  public async getInfo(custCoreNo: string) {
    const { CustInfo, CustLabelInfo } = this.app.model;
    const [cust, labelInfos] = await Promise.all([
      CustInfo.findOne({
        where: {
          cust_core_no: custCoreNo,
        },
      }),
      CustLabelInfo.findAll({
        where: {
          cust_core_no: custCoreNo,
        },
      }),
    ]);
    return {
      ...cust.toJSON(),
      labelInfos: labelInfos.map((o) => o.toJSON()),
    };
  }

  public async getProductInfo(custCoreNo: string) {
    const { QrqmRecommandMysql, QrqmProductInfoMysql } = this.app.model;
    const custProductInfo = await QrqmRecommandMysql.findOne({
      where: {
        cust_core_no: custCoreNo,
      },
    });
    const recomandProducts = await QrqmProductInfoMysql.findAll({
      where: {
        prd_code: [
          custProductInfo.prd_code_1,
          custProductInfo.prd_code_2,
          custProductInfo.prd_code_3,
        ],
      },
    });
    return {
      ...custProductInfo.toJSON(),
      recomandProducts: recomandProducts.map((o) => o.toJSON()),
    };
  }
}

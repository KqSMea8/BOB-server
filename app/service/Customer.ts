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
    const {
      CustInfo,
      GCustomerCustAssetsRating,
      GCustomerDebtCardBill,
      CustLabelInfo,
    } = this.app.model;
    const [cust, assetsRatings, debtCardBills, labelInfos] = await Promise.all([
      CustInfo.findOne({
        where: {
          cust_core_no: custCoreNo
        },
      }),
      GCustomerCustAssetsRating.findAll({
        where: {
          cust_core_no: custCoreNo,
        },
      }),
      GCustomerDebtCardBill.findAll({
        where: {
          cust_core_no: custCoreNo
        },
      }),
      CustLabelInfo.findAll({
        where: {
          cust_core_no: custCoreNo
        },
      }),
    ]);
    return {
      ...cust.toJSON(),
      assetsRatings: assetsRatings.map((o) => o.toJSON()),
      debtCardBills: debtCardBills.map((o) => o.toJSON()),
      labelInfos: labelInfos.map((o) => o.toJSON()),
    };
  }
}

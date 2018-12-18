// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustInfo from '../../../app/model/cust_info';
import ExportCustLabelInfo from '../../../app/model/cust_label_info';
import ExportGCustomerCustAssetsRating from '../../../app/model/g_customer_cust_assets_rating';
import ExportGCustomerDebtCardBill from '../../../app/model/g_customer_debt_card_bill';
import ExportInfo = require('../../../app/model/info');

declare module 'sequelize' {
  interface Sequelize {
    CustInfo: ReturnType<typeof ExportCustInfo>;
    CustLabelInfo: ReturnType<typeof ExportCustLabelInfo>;
    GCustomerCustAssetsRating: ReturnType<typeof ExportGCustomerCustAssetsRating>;
    GCustomerDebtCardBill: ReturnType<typeof ExportGCustomerDebtCardBill>;
    Info: ReturnType<typeof ExportInfo>;
  }
}

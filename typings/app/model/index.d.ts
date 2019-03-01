// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustInfo from '../../../app/model/cust_info';
import ExportCustLabelInfo from '../../../app/model/cust_label_info';
import ExportQrqmProductInfoMysql from '../../../app/model/qrqm_product_info_mysql';
import ExportQrqmRecommandMysql from '../../../app/model/qrqm_recommand_mysql';

declare module 'sequelize' {
  interface Sequelize {
    CustInfo: ReturnType<typeof ExportCustInfo>;
    CustLabelInfo: ReturnType<typeof ExportCustLabelInfo>;
    QrqmProductInfoMysql: ReturnType<typeof ExportQrqmProductInfoMysql>;
    QrqmRecommandMysql: ReturnType<typeof ExportQrqmRecommandMysql>;
  }
}

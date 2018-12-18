import { Application } from 'egg';
module.exports = (app: Application) => {
  const { STRING } = app.Sequelize;

  // 22字段

  // const sample = [
  //   '201811',
  //   '000000000000007',
  //   '1700.0',
  //   '1',
  //   '107.0',
  //   '1',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  //   'NULL',
  // ];

  return app.model.define('g_customer_debt_card_bill', {
    trade_date: STRING,
    cust_core_no: STRING,
    monthly_in_balance: STRING,
    n_monthly_in_balance: STRING,
    monthly_out_balance: STRING,
    n_monthly_out_balance: STRING,
    monthly_cjwy_transfer: STRING,
    n_monthly_cjwy_transfer: STRING,
    monthly_edzf_transfer: STRING,
    n_monthly_edzf_transfer: STRING,
    monthly_bb_fp: STRING,
    n_monthly_bb_fp: STRING,
    monthly_fbb_fp: STRING,
    n_monthly_fbb_fp: STRING,
    monthly_fund: STRING,
    n_monthly_fund: STRING,
    monthly_hn_transfer: STRING,
    n_monthly_hn_transfer: STRING,
    monthly_pos: STRING,
    n_monthly_pos: STRING,
    monthly_debt: STRING,
    n_monthly_debt: STRING,
  });
};

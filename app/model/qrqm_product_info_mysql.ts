import { Application } from 'egg';
module.exports = (app: Application) => {
  const { STRING } = app.Sequelize;

  return app.model.define(
    'qrqm_product_info_mysql',
    {
      prd_code: {
        type: STRING,
        primaryKey: true,
      },
      prd_name: STRING,
      exp_income_rate: STRING,
      risk_level: STRING,
      pfirst_amt: STRING,
    },
    {
      freezeTableName: true,
    },
  );
};

import { Application } from 'egg';
module.exports = (app: Application) => {
  const { STRING } = app.Sequelize;

  return app.model.define(
    'qrqm_recommand_mysql',
    {
      cust_core_no: {
        type: STRING,
        primaryKey: true,
      },
      prd_code_1: STRING,
      prd_code_2: STRING,
      prd_code_3: STRING,
    },
    {
      freezeTableName: true,
    },
  );
};

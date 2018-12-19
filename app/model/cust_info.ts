import { Application } from 'egg';
module.exports = (app: Application) => {
  const { STRING } = app.Sequelize;

  return app.model.define(
    'cust_info',
    {
      data_date: STRING,
      cust_core_no: STRING,
      ch_name: STRING,
      sex: STRING,
      age: STRING,
      birth_date: STRING,
      constellation: STRING,
      mobile_phone: STRING,
      cert_type: STRING,
      cert_no: STRING,
      fin_risk_rating: STRING,
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ['cust_core_no'],
        },
        {
          fields: ['cert_no', 'ch_name'],
        },
      ],
    },
  );
};

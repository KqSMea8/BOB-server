import { Application } from 'egg';
module.exports = (app: Application) => {
  const { STRING } = app.Sequelize;

  // const sample = [
  //   '2018-12-03',
  //   '000000026168042',
  //   '男',
  //   '38',
  //   '19770417',
  //   '金牛座',
  //   '137********',
  //   '01',
  //   '******19770417****',
  //   '01005',
  //   '月光族',
  //   '01',
  // ];

  return app.model.define(
    'cust_label_info',
    {
      cust_core_no: STRING,
      label_code: STRING,
      label_name: STRING,
      label_type_code: STRING,
    },
    {
      freezeTableName: true,
      indexes: [
        {
          fields: ['cust_core_no'],
        },
      ],
    },
  );
};

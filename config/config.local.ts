import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'bob',
    host: 'localhost',
    // host: '106.14.134.91',
    port: 3306,
    username: 'root',
    password: '123456',
    define: {
      timestamps: false,
    },
  };

  return config;
};

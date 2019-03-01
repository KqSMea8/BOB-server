import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 10.160.2.136
  // root
  // metadata@Tbds.com
  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'qrqms_db',
    host: '10.160.2.136',
    port: 3306,
    username: 'root',
    password: 'metadata@Tbds.com',
    define: {
      timestamps: false,
    },
  };

  return config;
};

// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/service/Customer';

declare module 'egg' {
  interface IService {
    customer: ExportCustomer;
  }
}

// This file is created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/controller/customer';

declare module 'egg' {
  interface IController {
    customer: ExportCustomer;
  }
}

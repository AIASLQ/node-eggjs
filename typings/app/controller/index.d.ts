// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportUser = require('../../../app/controller/user');
import ExportUserAccess = require('../../../app/controller/userAccess');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    user: ExportUser;
    userAccess: ExportUserAccess;
  }
}

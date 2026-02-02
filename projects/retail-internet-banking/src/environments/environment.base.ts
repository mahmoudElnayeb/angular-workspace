import { IEnvironmentBase } from 'shared';

/** Base config shared by all environment files. This file is never replaced by build. */
export const environmentBase: IEnvironmentBase = {
  production: false,
  appName: 'AngularWorkspace',
  url: 'https://api.example.com',
  prefix: 'api',
  customPrefix: {
    user: 'users1',
    admin: 'admins1',
  },
};

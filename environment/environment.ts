import { IEnvironmentBase } from "shared";

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

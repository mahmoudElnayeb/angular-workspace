import { environmentBase } from './environment';

export const environment = {
  ...environmentBase,
  production: false,
  apiUrl: 'http://localhost:3000',
  // Mock-specific overrides here
};

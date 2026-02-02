export interface IEnvironmentConfig {
  url?: string;
  prefix?: string;
  customPrefix?: Record<string, string>;
  [key: string]: unknown;
}

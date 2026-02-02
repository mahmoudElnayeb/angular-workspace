import { IEnvironmentConfig } from "./environment-config.interface";

export interface IEnvironmentBase extends IEnvironmentConfig {
    production?: boolean;
    appName?: string;
}
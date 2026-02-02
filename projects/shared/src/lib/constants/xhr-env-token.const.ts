import { InjectionToken } from '@angular/core';
import { IEnvironmentBase } from '../models/models';

/** Token for providing XHR env config from the app's current build/serve environment */
export const XHR_ENV_CONFIG = new InjectionToken<IEnvironmentBase>('XHR_ENV_CONFIG');
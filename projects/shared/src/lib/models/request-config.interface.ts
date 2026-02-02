import type { HttpMethod } from '../enums/http-method.enum';
import type { Category } from '../enums/category.enum';
import type { ApiVersion } from '../enums/api-version.enum';

export interface IRequestConfig {
  method: HttpMethod;
  endpoint: string;
  body?: unknown;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  category?: Category;
  apiVersion?: ApiVersion;
  url?: string;
  prefix?: string;
  allowObserveResponse?: boolean;
}

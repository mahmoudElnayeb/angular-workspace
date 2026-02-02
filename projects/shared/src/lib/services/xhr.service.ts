import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { XHR_ENV_CONFIG } from '../constants/constants';
import { HttpMethod } from '../enums/http-method.enum';
import type { IRequestConfig, IEnvironmentBase } from '../models/models';


@Injectable({
  providedIn: 'root',
})
export class XhrService {
  private readonly http = inject(HttpClient);
  /** Env config from app (current build/serve); falls back to window.environment?.xhr for legacy */
  private readonly env: IEnvironmentBase | undefined = inject(XHR_ENV_CONFIG, { optional: true }) ?? (typeof window !== 'undefined' ? (window as unknown as { environment?: { xhr?: IEnvironmentBase } }).environment?.xhr : undefined);

  call<T>(config: IRequestConfig): Observable<T> {
    const headers = this.setHeaders(config);
    let params = this.setParams(config);
    const baseUrl = config.url ?? this.env?.url ?? '';
    const prefix = this.getPrefix(config);
    const fullUrl = `${baseUrl}/${prefix}/${config.category ?? ''}/${config.apiVersion ?? ''}/${config.endpoint}`;

    const opts = { headers, params, ...(config.allowObserveResponse && { observe: 'response' as const }) };

    switch (config.method) {
      case HttpMethod.GET:
        return this.http.get<T>(fullUrl, opts as object) as Observable<T>;
      case HttpMethod.POST:
        return this.http.post<T>(fullUrl, config.body, opts as object) as Observable<T>;
      case HttpMethod.PUT:
        return this.http.put<T>(fullUrl, config.body, opts as object) as Observable<T>;
      case HttpMethod.DELETE:
        return this.http.delete<T>(fullUrl, opts as object) as Observable<T>;
      case HttpMethod.PATCH:
        return this.http.patch<T>(fullUrl, config.body, opts as object) as Observable<T>;
      default:
        throw new Error('Unsupported HTTP method');
    }
  }

  private getPrefix(config: IRequestConfig): string {
    if (this.env?.customPrefix) {
      for (const key in this.env.customPrefix) {
        if (config.category === key) {
          return this.env.customPrefix[key];
        }
      }
    }
    return config.prefix ?? this.env?.prefix ?? '';
  }

  private setParams(config: IRequestConfig): HttpParams {
    let params = new HttpParams();
    if (config.params) {
      Object.entries(config.params).forEach(([key, value]) => {
        params = params.set(key, String(value));
      });
    }
    return params;
  }

  private setHeaders(config: IRequestConfig): HttpHeaders {
    let headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('content-type', 'application/json');
    if (config.headers) {
      Object.entries(config.headers).forEach(([key, value]) => {
        headers = headers.set(key, value);
      });
    }
    return headers;
  }
}

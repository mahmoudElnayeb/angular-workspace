import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiVersion, BaseComponent, Category, HttpMethod, XhrService } from 'shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [XhrService],
})
export class App extends BaseComponent {
  protected readonly title = signal('retail-internet-banking');

  constructor() {
    super();
    // XhrService is available as this.xhrService (from BaseComponent).
    // call() returns an Observable — subscribe to run the request.
    this.subscription.add(
      this.xhrService.call<{ id: number; name: string }[]>({
        method: HttpMethod.GET,
        category: Category.USER,
        apiVersion: ApiVersion.V1,
        endpoint: 'users',
        // url, prefix come from XHR_ENV_CONFIG (environment) if omitted
      }).subscribe({
        next: (data) => console.log('Users:', data),
        error: (err) => console.error('XHR error:', err),
      })
    );
  }
}

import { Directive, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageService } from '../services/lang.service';
import { XhrService } from '../services/xhr.service';

@Directive({
  standalone: true,
})
export abstract class BaseComponent {
  protected readonly langService = inject(LanguageService);
  protected readonly xhrService = inject(XhrService);
  protected readonly fb = inject(FormBuilder);
  protected readonly formControl = new FormControl<unknown>(null);
  protected readonly subscription = new Subscription();

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}

import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from '../enums/lang.enum';
import { Directions } from '../enums/directions.enum';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly supportedLangs = [Lang.EN, Lang.AR];
  readonly currentLang = signal<Lang>(Lang.EN);
  private readonly translateService = inject(TranslateService);

  setLanguage(lang: Lang): void {
    if (this.supportedLangs.includes(lang)) {
      this.currentLang.set(lang);
      this.translateService.use(lang);
    }
  }

  getCurrentLanguage(): Lang {
    return this.currentLang();
  }

  toggleLanguage(): void {
    const newLang = this.currentLang() === Lang.EN ? Lang.AR : Lang.EN;
    this.setLanguage(newLang);
    this.changeMainLang(newLang);
    this.changeMainDirection();
  }

  changeLanguage(lang: Lang): void {
    this.setLanguage(lang);
    this.changeMainLang(lang);
  }

  getSupportedLanguages(): Lang[] {
    return this.supportedLangs;
  }

  isCurrentLanguage(lang: Lang): boolean {
    return this.currentLang() === lang;
  }

  getDirection(): Directions {
    return this.currentLang() === Lang.AR ? Directions.RTL : Directions.LTR;
  }

  changeMainDirection(): void {
    const dir = this.getDirection();
    document.documentElement.dir = dir;
  }

  changeMainLang(lang: Lang): void {
    document.documentElement.lang = lang;
  }
}

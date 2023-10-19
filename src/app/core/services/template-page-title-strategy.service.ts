import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  override updateTitle(routerState: RouterStateSnapshot) {
    const portalTitleKey = this.translation.instant('i18n.core.portalTitle.ApartmentSearch');
    const pageTitleKey = this.buildTitle(routerState);

    const translatedTitle = pageTitleKey
      ? `${this.translation.instant(pageTitleKey)} - ${portalTitleKey}`
      : portalTitleKey;
    this.title.setTitle(translatedTitle);
  }

  constructor(private readonly title: Title, private translation: TranslateService) {
    super();
  }
}

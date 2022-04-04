import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import {
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items = [{ title: 'Profile' }, { title: 'Logout' }];
  currentTheme!: string;
  siteLanguage!: string;
  isLoggedIn = false;

  languageList = [
    {
      title: 'English',
      data: Languages.EN
    },
    {
      title: 'Spanish',
      data: Languages.ES
    }
  ];

  constructor(
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService,
    private readonly translateService: TranslateService,
    private nbMenuService: NbMenuService
  ) {
    themeService
      .onThemeChange()
      .subscribe(({ name }) => (this.currentTheme = name));

    this.siteLanguage =
      localStorage.getItem('language') ??
      this.translateService.getBrowserLang() ??
      'en';
    this.translateService.setDefaultLang(this.siteLanguage);
    this.changeLanguage(this.siteLanguage);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true);
    return false;
  }

  changeTheme() {
    this.themeService.changeTheme(
      this.currentTheme === 'dark' ? 'default' : 'dark'
    );
  }

  changeLanguage(language: string) {
    const selectedLanguage = this.languageList.find(
      (lang) => lang.data === language
    );

    if (selectedLanguage) {
      this.siteLanguage = selectedLanguage.data;
      this.translateService.use(language);
      localStorage.setItem('language', language);
    }
  }

  ngOnInit(): void {
    this.nbMenuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'language-list-menu'))
      .subscribe(({ item }) => this.changeLanguage(item.data));
  }
}

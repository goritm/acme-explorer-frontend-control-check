import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import {
  NbMenuService,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/app/shared/enums/languages.enum';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Router } from '@angular/router';

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

  // TODO: Remove this logic out of navbar
  constructor(
    private readonly authService: AuthService,
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService,
    private readonly translateService: TranslateService,
    private readonly menuService: NbMenuService,
    private router: Router
  ) {
    // theme
    this.themeService.onThemeChange().subscribe(({ name }) => {
      this.currentTheme = name;
      localStorage.setItem('theme', name);
    });

    // language
    this.siteLanguage =
      localStorage.getItem('language') ??
      this.translateService.getBrowserLang() ??
      'en';
    this.translateService.setDefaultLang(this.siteLanguage);
    this.changeLanguage(this.siteLanguage);

    // logged in
    this.authService.isAuthenticated.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn) {
        this.router.navigate(['/']);
      }
    });
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
    this.menuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'language-list-menu'))
      .subscribe(({ item }) => this.changeLanguage(item.data));
  }
}

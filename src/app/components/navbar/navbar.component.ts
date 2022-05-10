import { IUser } from 'src/utils/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { NbMenuItem, NbMenuService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/utils/enums/languages.enum';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: NbMenuItem[] = [
    { title: 'Profile', link: 'profile' },
    { title: 'Logout' }
  ];
  currentTheme = 'default';
  siteLanguage = 'en';
  isLoggedIn = false;
  currentUser!: IUser;

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
    private readonly authService: AuthService,
    private readonly themeService: NbThemeService,
    private readonly translateService: TranslateService,
    private readonly menuService: NbMenuService
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
    this.authService.getCurrentUser.subscribe((user) => {
      this.currentUser = user;
    });

    this.authService.isAuthenticated.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.menuService.onItemClick().subscribe(({ item }) => {
      if (item.title === 'Logout') {
        this.authService.logout();
      }
    });

    this.menuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'language-list-menu'))
      .subscribe(({ item }) => this.changeLanguage(item.data));
  }
}

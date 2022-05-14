import { IUser } from 'src/utils/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';

import { NbMenuItem, NbMenuService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Languages } from 'src/utils/enums/languages.enum';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { Router } from '@angular/router';
import { MANAGER, SPONSOR, UserRoles } from 'src/utils/enums/user-roles.enum';
import {
  ADMIN_MENU_ITEMS,
  EXPLORER_MENU_ITEMS,
  MANAGER_MENU_ITEMS,
  SPONSOR_MENU_ITEMS
} from './utils/nb-menu-items';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  items: NbMenuItem[] = EXPLORER_MENU_ITEMS;
  currentTheme = 'default';
  siteLanguage = 'en';
  isLoggedIn = false;
  currentUser!: IUser;

  // Navbar for manager
  isManager(): boolean {
    return MANAGER.includes(this.currentUser.role);
  }

  isSponsor(): boolean {
    return SPONSOR.includes(this.currentUser.role);
  }

  isAdmin(): boolean {
    console.log(this.currentUser.role === UserRoles.ADMIN);
    return this.currentUser.role === UserRoles.ADMIN;
  }

  menu(): NbMenuItem[] {
    if (this.isAdmin()) {
      this.items = ADMIN_MENU_ITEMS;
      return this.items;
    } else if (this.isManager()) {
      this.items = [...MANAGER_MENU_ITEMS, ...EXPLORER_MENU_ITEMS];
    } else if (this.isSponsor()) {
      this.items = [SPONSOR_MENU_ITEMS, ...EXPLORER_MENU_ITEMS];
    }
    return this.items;
  }

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
    private readonly menuService: NbMenuService,
    private readonly router: Router
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
      this.menu();
    });

    this.authService.isAuthenticated.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.menuService.onItemClick().subscribe(({ item }) => {
      if (item.title === 'Logout') {
        this.authService.logout();
      }

      this.router.navigate([item.link]);
    });

    this.menuService
      .onItemClick()
      .pipe(filter(({ tag }) => tag === 'language-list-menu'))
      .subscribe(({ item }) => this.changeLanguage(item.data));
  }
}

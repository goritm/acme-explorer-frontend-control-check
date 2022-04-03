import { Component, OnInit } from '@angular/core';
import {
  NbJSThemesRegistry,
  NbSidebarService,
  NbThemeService
} from '@nebular/theme';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentTheme!: string;
  items = [{ title: 'Profile' }, { title: 'Logout' }];

  constructor(
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService
  ) {
    themeService
      .onThemeChange()
      .subscribe(({ name }) => (this.currentTheme = name));
  }

  ngOnInit(): void {}

  toggleSidebar(): boolean {
    this.sidebarService.toggle();
    return false;
  }

  changeTheme() {
    this.themeService.changeTheme(
      this.currentTheme === 'dark' ? 'default' : 'dark'
    );
  }
}

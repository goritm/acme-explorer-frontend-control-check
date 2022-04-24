import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { AuthService } from './modules/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'acme-explorer-front';

  items: NbMenuItem[] = [
    {
      title: 'Trips',
      icon: 'paper-plane-outline',
      link: '/trips',
      home: true
    },
    {
      title: 'Applications',
      icon: 'file-text-outline',
      link: '/applications',
      home: false
    }
  ];

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/authentication/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'acme-explorer-front';

  constructor(protected authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}

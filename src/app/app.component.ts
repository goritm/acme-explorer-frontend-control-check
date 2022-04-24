import { Component } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
}

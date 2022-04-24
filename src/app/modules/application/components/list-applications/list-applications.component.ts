import { Component } from '@angular/core';
import { ListApplicationsService } from './list-applications.service';
import { IApplication } from '../../interfaces/application.interface';

@Component({
  selector: 'list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.scss']
})
export class ListApplicationsComponent {
  applications: IApplication[] = [];
  placeholders: any = [];
  pageSize = 10;
  pageToLoadNext = 1;
  loading = false;

  constructor(private listApplicationService: ListApplicationsService) {}

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.listApplicationService.fetch().subscribe(({ data }) => {
      this.placeholders = [];
      this.applications.push(...data.listApplications.data);
      this.loading = false;
      this.pageToLoadNext++;
    });
  }
}

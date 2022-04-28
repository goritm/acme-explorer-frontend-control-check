import { Component, OnInit } from '@angular/core';
import { ListApplicationsService } from './list-applications.service';
import { IApplication } from '../../interfaces/application.interface';

@Component({
  selector: 'list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.scss']
})
export class ListApplicationsComponent implements OnInit {
  applications: IApplication[] = [];
  placeholders: unknown = [];
  pageSize = 25;
  pageToLoadNext = 1;
  loading = false;

  constructor(private listApplicationService: ListApplicationsService) {}

  loadNext() {
    if (this.loading) {
      return;
    }

    this.loading = true;
    this.placeholders = new Array(this.pageSize);
    this.listApplicationService
      .fetch({ limit: this.pageSize })
      .subscribe(({ data }) => {
        this.placeholders = [];
        this.applications = data.getSelfApplications.data;
        this.loading = false;
        this.pageToLoadNext++;
      });
  }

  ngOnInit(): void {
    this.loadNext();
  }
}

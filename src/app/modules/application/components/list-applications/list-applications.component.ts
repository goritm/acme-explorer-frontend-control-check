import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/modules/authentication/services/auth.service';
import { ApplicationService } from '../../application.service';
import { IApplication } from '../../graphql/interfaces/application.interface';
import { RejectApplicationDialogComponent } from '../dialog/reject-application-dialog/reject-application-dialog.component';

@Component({
  selector: 'list-applications',
  templateUrl: './list-applications.component.html',
  styleUrls: ['./list-applications.component.scss']
})
export class ListApplicationsComponent implements OnInit {
  Object = Object;
  applications: IApplication[] = [];
  applicationCategories: any = {};
  placeholders: unknown = [];
  pageSize = 25;
  pageToLoadNext = 1;
  loading = false;
  userRole: string | undefined;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNext();
    this.userRole = this.authService.getRole();
  }

  loadNext() {
    this.placeholders = new Array(this.pageSize);
    this.applicationService
      .fetch({ limit: this.pageSize })
      .subscribe(({ data }) => {
        this.placeholders = [];
        this.applications = data.getSelfApplications.data;
        this.pageToLoadNext++;

        this.applicationCategories = this.categorizeApplications(
          data.getSelfApplications.data
        );
      });
  }

  categorizeApplications(applications: IApplication[]) {
    return applications.reduce((categories: any, application) => {
      const { state } = application;

      if (!categories[state]) categories[state] = [];

      categories[state].push(application);
      return categories;
    }, {});
  }

  acceptApplication(id: string) {
    this.loading = true;

    this.applicationService
      .acceptApplication(id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.success(`Application has been accepted.`);
          }
        },
        error: (err) => {
          this.toastrService.danger(err.message);
          console.error(err);
        }
      });
  }

  rejectApplication(application: IApplication) {
    this.dialogService.open(RejectApplicationDialogComponent, {
      context: {
        title: 'Reject application',
        application
      }
    });
  }

  cancelApplication(id: string) {
    this.loading = true;

    this.applicationService
      .cancelApplication(id)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.success(`Application has been cancelled.`);
            this.loadNext();
          }
        },
        error: (err) => {
          this.toastrService.danger(err.message);
          console.error(err);
        }
      });
  }

  goToTrip(id: string) {
    this.router.navigate(['/trips/detail/', id]);
  }
}

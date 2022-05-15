import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  applications: IApplication[] = [];
  pageSize = 25;
  loading = false;
  userRole: string | undefined;

  constructor(
    private applicationService: ApplicationService,
    private authService: AuthService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadNext();
    this.userRole = this.authService.getRole();
  }

  loadNext() {
    this.loading = true;
    this.applicationService
      .fetch({ limit: this.pageSize })
      .subscribe(({ data }) => {
        this.applications = data.getSelfApplications.data;
        this.loading = false;
      });
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
}

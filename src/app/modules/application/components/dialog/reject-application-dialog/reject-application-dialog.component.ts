import { IApplication } from 'src/app/modules/application/graphql/interfaces/application.interface';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { finalize } from 'rxjs';
import { ApplicationService } from 'src/app/modules/application/application.service';
import { RejectApplicationInput } from '../../../graphql/inputs/reject-application.input';

@Component({
  selector: 'app-reject-application-dialog',
  templateUrl: './reject-application-dialog.component.html',
  styleUrls: ['./reject-application-dialog.component.scss']
})
export class RejectApplicationDialogComponent implements OnInit {
  title = '';
  application!: IApplication;
  submitted = false;
  loading = false;

  rejectApplicationForm = this.fb.group({
    reasonRejected: ['', [Validators.required]]
  });

  constructor(
    protected dialogRef: NbDialogRef<RejectApplicationDialogComponent>,
    private applicationService: ApplicationService,
    private fb: FormBuilder,
    private toastrService: NbToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.title = this.dialogRef.componentRef.instance.title;
    this.application = this.dialogRef.componentRef.instance.application;
  }

  close() {
    this.dialogRef.close();
  }

  rejectApplication() {
    this.submitted = true;
    this.loading = true;

    const rejectApplicationInput: RejectApplicationInput = {
      id: this.application.id,
      reasonRejected: this.rejectApplicationForm.value.reasonRejected
    };

    this.applicationService
      .rejectApplication(rejectApplicationInput)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: ({ data }) => {
          if (!(data === undefined || data === null)) {
            this.toastrService.success(
              `Application ${this.application.id} rejected successfully`
            );
            this.rejectApplicationForm.reset();
            this.dialogRef.close();
          }
        },
        error: (err) => {
          this.toastrService.danger(err.message);
          console.error(err);
        }
      });
  }
}

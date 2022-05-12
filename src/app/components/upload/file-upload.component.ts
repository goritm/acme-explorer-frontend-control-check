import { AbstractControl, ControlContainer, FormControl } from '@angular/forms';
import { ChangeDetectorRef, Component, Input, SkipSelf } from '@angular/core';
import { finalize } from 'rxjs';
import { ImageService } from './image.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class FileUploadComponent {
  file: File | null = null;
  loading = false;
  imageUrl: string | null = '';
  @Input() control!: FormControl;

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef
  ) {}

  uploadImage($event: any) {
    const file = $event.target.files?.[0];
    this.loading = true;
    this.file = file;

    this.imageService
      .uploadImage(file)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data?.body);
          this.imageUrl = data?.body;
          this.control.setValue(this.imageUrl, {
            emitModelToViewChange: false
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}

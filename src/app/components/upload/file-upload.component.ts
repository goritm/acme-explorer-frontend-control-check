import { ControlContainer } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  SkipSelf
} from '@angular/core';
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
  @Input() controlName!: string;

  constructor(
    private imageService: ImageService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.loading = true;
    this.file = event?.[0];
    this.imageService
      .uploadImage(this.file)
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
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
}

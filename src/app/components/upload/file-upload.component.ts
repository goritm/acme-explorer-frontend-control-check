import { Component, HostListener } from '@angular/core';
import { ImageService } from './image.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  file: File | null = null;
  imageUrl: string | null = '';

  constructor(private imageService: ImageService) {}

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.file = event?.[0];
    this.imageService.uploadImage(this.file).subscribe({
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

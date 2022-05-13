import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  constructor(private http: HttpClient) {}

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('file', image);

    return this.http.post(`${environment.apiUrl}/picture`, formData, {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : ''
      }),
      observe: 'response',
      responseType: 'text'
    });
  }

  public deleteImage(url: string) {
    return this.http.delete(
      'https://upload-service-bujosa.cloud.okteto.net/upload/file',
      {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('token')
            ? `Bearer ${localStorage.getItem('token')}`
            : ''
        }),
        body: {
          url
        }
      }
    );
  }
}

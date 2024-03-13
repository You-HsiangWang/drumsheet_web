import { Component, inject } from '@angular/core';
import { FileUploadEvent, FileUploadHandlerEvent, FileUploadModule } from 'primeng/fileupload';
import { HttpService } from '../../../../core/service/http/http.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-edit-sheet',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './edit-sheet.component.html',
  styleUrl: './edit-sheet.component.scss'
})
export class EditSheetComponent {
  private http = inject(HttpService)

  onUpload($event: FileUploadHandlerEvent): void {
    console.log('hihi');
    console.log($event);
    this.http.post('http://localhost','',{uploadFile: $event.files[0]})
  }
}

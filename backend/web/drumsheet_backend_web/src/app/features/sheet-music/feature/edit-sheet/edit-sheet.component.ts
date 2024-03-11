import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-edit-sheet',
  standalone: true,
  imports: [FileUploadModule],
  templateUrl: './edit-sheet.component.html',
  styleUrl: './edit-sheet.component.scss'
})
export class EditSheetComponent {
  onUpload(): void {
    console.log();
  }
}

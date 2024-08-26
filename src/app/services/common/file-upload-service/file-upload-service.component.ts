import { Component, Input } from '@angular/core';
import { NgxFileDropModule, NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { CommonModule } from '@angular/common';//*ngFor  da hata veriyor bu yuzden declere edilmeli.
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Positions } from '../../admin/alertify.service';
import { CustomToastOptions, CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
//Ngx-file-drop
//Bu componentin service mantigiyla kullandigimiz icin service altinda olustu.
@Component({
  selector: 'app-file-upload-service',
  standalone: true,
  imports: [NgxFileDropModule, CommonModule],
  templateUrl: './file-upload-service.component.html',
  styleUrl: './file-upload-service.component.scss'
})
export class FileUploadServiceComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlertifyService,
    private customToasterService: CustomToastrService
  ) { }


  // bu componentin kullanildigi yerde bu sekilde options gonderilir ve input ile alinir.<app-file-upload-service [options]="">
  @Input() options: Partial<FileUploadOptions>;//Partial tur guvenligi icin kullanilir.
  public files: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      //as ile tip donusturme yaptik.
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        //append fonk icindeki string | blob demek string yada dosya olabilir. Blob dosya
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.accept,
      queryString: this.options.queryString,
      headers: new HttpHeaders({ "responseType": "blob" })

    }, fileData).subscribe(data => {

      const message: string = "Files uploaded successfuly!";
      if (this.options.isAdminPage) {
        this.alertifyService.message(message, {
          messageType: MessageType.Success,
          position: Positions.TopRight
        })
      }
      else {
        this.customToasterService.message("Success", message, {
          MessageType: ToastrMessageType.Success,
          Position: ToastrPosition.TopRight
        });
      }
    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Something went wrong! Files could not uploaded!";
      if (this.options.isAdminPage) {
        this.alertifyService.message(message, {
          messageType: MessageType.Error,
          position: Positions.TopRight
        })
      }
      else {
        this.customToasterService.message("Error", message, {
          MessageType: ToastrMessageType.Error,
          Position: ToastrPosition.TopRight
        })
      }
    }
    );
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;//belirli bir dosya turunu kabul etmek isteyebiliriz. O yuzden var.
  isAdminPage?: boolean = false;
}

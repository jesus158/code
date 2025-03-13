import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { StorageAwsS3Service } from 'src/app/modules/dashboard/storage-aws-s3/storage-aws-s3.service';
import { FilesService } from '../../files.service';
import { Files } from '../../interfaces/files';

@Component({
  selector: 'app-files-modal',
  templateUrl: './files-modal.component.html',
  styleUrls: ['./files-modal.component.scss'],
})
export class FilesModalComponent {
  visible: boolean = false;
  files_uid!: string;
  follow_up_uid!: string;
  acceptedFiles: string =
    '.jpg , .jpeg , .png, .pdf, .csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .ppt , .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation';
  uploadedFiles: any[] = [];
  FileUpload: any;

  @Output() RealoadFiles: EventEmitter<any> = new EventEmitter<any>();

  FilesForm = this.fb.group({
    files_name: [''],
    files_url: [''],
    files_url_default: [''],
    files_type: [''],
    file: [''],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private storages3: StorageAwsS3Service,
    private activeRoute: ActivatedRoute,
    private messageService: MessageService,
    private leadsFilesService: FilesService,
    private awsS3: StorageAwsS3Service
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.follow_up_uid = data['follow_up_uid'])
    );
  }

  showModalSave() {
    this.visible = true;
  }

  async getFiles(files_uid: string | null | undefined): Promise<Files[]> {
    const result = await this.leadsFilesService.get_Files(files_uid);
    this.FilesForm.patchValue({
      files_name: result.files_name,
      files_url: result.files_url,
    });
    return result;
  }

  showModalUpdate(files: string | null | undefined) {
    this.files_uid = String(files);
    this.getFiles(files);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (!this.FilesForm.valid) {
      return this.FilesForm.markAllAsTouched();
    } else {
      const response = await this.save_image();
      if (response?.url) {
        const characters =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 12; i++) {
          password += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }

        this.FilesForm.patchValue({
          files_name: response?.fileName,
          files_url: response?.url,
        });
      }
      const result = await this.leadsFilesService.post_files(
        this.follow_up_uid,
        this.FilesForm.value
      );
      this.FilesForm.reset();
      this.visible = false;
      this.RealoadFiles.emit();
      return result;
    }
  }

  onHide() {
    this.FilesForm.reset();
    this.files_uid = '';
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  myUploader(event: any, fileUpload: FileUpload) {
    if (event.files.length > 0) {
      const File = event.files[0];
      console.log(File.type);
      this.FilesForm.patchValue({
        file: File,
        files_type: File?.type,
      });
      this.selectDocumentType(File?.type);
      this.messageService.add({
        severity: 'success',
        summary: 'File Uploaded',
        detail: 'Message Content',
      });
      this.FileUpload = fileUpload;
    }
  }

  async save_image(): Promise<any> {
    const formData = new FormData();
    formData.append('file', this.FilesForm.get('file')?.value || '');
    const url_image = await this.storages3.post_s3('leads', formData);
    return url_image;
  }

  selectDocumentType(type: any) {
    switch (type) {
      case '.doc' ||
        '.docx' ||
        'application/msword' ||
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        this.FilesForm.patchValue({
          files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AMicrosoft_Office_Word_%25282019%25E2%2580%2593present%2529.svg&psig=AOvVaw0s1SiIY2IAHq_xf6-3wX05&ust=1695255780358000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPDWwIj2t4EDFQAAAAAdAAAAABAI',
        });
        break;
      case '.xls' ||
        '.xlsx' ||
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        'application/vnd.ms-excel':
        this.FilesForm.patchValue({
          files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.co.uk%2Fpin%2F864339353475697699%2F&psig=AOvVaw3U0JpU_1KArmxhXXC6tFOU&ust=1695255878046000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjH3bX2t4EDFQAAAAAdAAAAABAE',
        });
        break;
      case '.ppt' ||
        '.pptx' ||
        'application / vnd.ms - powerpoint' ||
        'application / vnd.openxmlformats - officedocument.presentationml.slideshow' ||
        'application / vnd.openxmlformats - officedocument.presentationml.presentation':
        this.FilesForm.patchValue({
          files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F442337994655053228%2F&psig=AOvVaw2mMukdFbW07xvUFPtbxsqG&ust=1695255924155000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIjiwcv2t4EDFQAAAAAdAAAAABAE',
        });
        break;
    }
  }
}

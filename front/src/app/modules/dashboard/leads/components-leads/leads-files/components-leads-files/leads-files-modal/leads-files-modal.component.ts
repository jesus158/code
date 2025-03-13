import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { LeadsFiles } from '../../interfaces/leads-files';
import { LeadsFilesService } from '../../leads-files.service';
import { StorageAwsS3Service } from 'src/app/modules/dashboard/storage-aws-s3/storage-aws-s3.service';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-leads-files-modal',
  templateUrl: './leads-files-modal.component.html',
  styleUrls: ['./leads-files-modal.component.scss'],
  providers: [MessageService],
})
export class LeadsFilesModalComponent {
  visible: boolean = false;
  leads_files!: string;
  leads_uid!: string;
  acceptedFiles: string =
    '.jpg , .jpeg , .png, .pdf, .csv, .xlsx, .xls, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .ppt , .pptx, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.slideshow, application/vnd.openxmlformats-officedocument.presentationml.presentation';
  uploadedFiles: any[] = [];
  FileUpload: any;

  @Output() RealoadLeadsFiles: EventEmitter<any> = new EventEmitter<any>();

  LeadsFilesForm = this.fb.group({
    lead_files_name: [''],
    lead_files_url: [''],
    lead_files_url_default: [''],
    lead_files_type: [''],
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
    private leadsFilesService: LeadsFilesService,
    private awsS3: StorageAwsS3Service
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.leads_uid = data['leads_uid'])
    );
  }

  showModalSave() {
    this.visible = true;
  }

  async getLeadsFiles(
    leads_files: string | null | undefined
  ): Promise<LeadsFiles[]> {
    const result = await this.leadsFilesService.get_LeadsFiles(
      this.leads_uid,
      leads_files
    );
    this.LeadsFilesForm.patchValue({
      lead_files_name: result.lead_files_name,
      lead_files_url: result.lead_files_url,
    });
    return result;
  }

  showModalUpdate(leads_files: string | null | undefined) {
    this.leads_files = String(leads_files);
    this.getLeadsFiles(leads_files);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (!this.LeadsFilesForm.valid) {
      return this.LeadsFilesForm.markAllAsTouched();
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

        this.LeadsFilesForm.patchValue({
          lead_files_name: response?.fileName,
          lead_files_url: response?.url,
        });
      }
      const result = await this.leadsFilesService.post_leads_files(
        this.leads_uid,
        this.LeadsFilesForm.value
      );
      this.LeadsFilesForm.reset();
      this.visible = false;
      this.RealoadLeadsFiles.emit();
      return result;
    }
  }

  onHide() {
    this.LeadsFilesForm.reset();
    this.leads_files = '';
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
      this.LeadsFilesForm.patchValue({
        file: File,
        lead_files_type: File?.type,
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
    formData.append('file', this.LeadsFilesForm.get('file')?.value || '');
    const url_image = await this.storages3.post_s3('leads', formData);
    return url_image;
  }

  selectDocumentType(type: any) {
    switch (type) {
      case '.doc' ||
        '.docx' ||
        'application/msword' ||
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        this.LeadsFilesForm.patchValue({
          lead_files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.m.wikipedia.org%2Fwiki%2FArchivo%3AMicrosoft_Office_Word_%25282019%25E2%2580%2593present%2529.svg&psig=AOvVaw0s1SiIY2IAHq_xf6-3wX05&ust=1695255780358000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPDWwIj2t4EDFQAAAAAdAAAAABAI',
        });
        break;
      case '.xls' ||
        '.xlsx' ||
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        'application/vnd.ms-excel':
        this.LeadsFilesForm.patchValue({
          lead_files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.co.uk%2Fpin%2F864339353475697699%2F&psig=AOvVaw3U0JpU_1KArmxhXXC6tFOU&ust=1695255878046000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCLjH3bX2t4EDFQAAAAAdAAAAABAE',
        });
        break;
      case '.ppt' ||
        '.pptx' ||
        'application / vnd.ms - powerpoint' ||
        'application / vnd.openxmlformats - officedocument.presentationml.slideshow' ||
        'application / vnd.openxmlformats - officedocument.presentationml.presentation':
        this.LeadsFilesForm.patchValue({
          lead_files_url_default:
            'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F442337994655053228%2F&psig=AOvVaw2mMukdFbW07xvUFPtbxsqG&ust=1695255924155000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIjiwcv2t4EDFQAAAAAdAAAAABAE',
        });
        break;
    }
  }
}

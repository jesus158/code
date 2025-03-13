import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BusinessService } from '../business.service';
import { Business } from '../interfaces/business';
import { CookieService } from 'ngx-cookie-service';
import { FileUpload } from 'primeng/fileupload';
import { StorageAwsS3Service } from '../../dashboard/storage-aws-s3/storage-aws-s3.service';

@Component({
  selector: 'app-business-form',
  templateUrl: './business-form.component.html',
  styleUrls: ['./business-form.component.scss'],
  providers: [MessageService],
})
export class BusinessFormComponent {
  value1?: string;
  value11: any;
  FileUpload: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  business_uid!: string | null | undefined;
  uploadedFiles: any[] = [];
  visible: boolean = false;
  acceptedFiles: string = '.jpg , .jpeg , .png';
  image_url!: string;

  BusinessForm = this.fb.group({
    business_name: ['', [Validators.required]],
    business_description: ['', [Validators.required]],
    business_image: [''],
    business_file_name: [''],
    business_file_name_delete: [''],
    file: [''],
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private businessService: BusinessService,
    private storages3: StorageAwsS3Service,
    private messageService: MessageService,
    private router: Router
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.business_uid = data['business_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.business_uid) {
      this.getBusiness(this.business_uid);
    }
  }

  async getBusiness(business_uid: string): Promise<Business> {
    const result = await this.businessService.get_Business(business_uid);
    this.BusinessForm.patchValue({
      business_name: result.business_name,
      business_description: result.business_description,
      business_image: result.business_image,
    });
    this.image_url = result.business_image;
    return result;
  }

  async Save(): Promise<any> {
    if(!this.BusinessForm.valid) return this.BusinessForm.markAllAsTouched();
    if (this.BusinessForm.get('file')?.value !== '' || null || undefined) {
      const response = await this.save_image();
      if (response?.url) {
        this.BusinessForm.patchValue({
          business_image: response?.url,
          business_file_name: response?.fileName,
        });
      }
    }
    const result = this.business_uid
    ? await this.businessService.update_business(this.business_uid, this.BusinessForm.value)
    : await this.businessService.post_business(this.BusinessForm.value);

    if(result) {
      this.BusinessForm.reset();
      this.onBack();
    }
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  myUploader(event: any, fileUpload: FileUpload) {
    if (event.files.length > 0) {
      const File = event.files[0];
      this.BusinessForm.patchValue({
        file: File,
      });
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
    formData.append('file', this.BusinessForm.get('file')?.value || '');
    const url_image = await this.storages3.post_s3('business', formData);
    return url_image;
  }

  onBack() {
    this.router.navigate(['/business'], {replaceUrl: true});
  }
}

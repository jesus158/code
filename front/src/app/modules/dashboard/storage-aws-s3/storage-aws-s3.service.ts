import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { NotificationsService } from '../components-dashboard/shared/notitications/notifications.service';
import {
  CreateBucketCommand,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root',
})
export class StorageAwsS3Service {
  private readonly s3Client = new S3Client({
    region: environment.AWS_S3_REGION,
    credentials: {
      accessKeyId: environment.AWS_S3_ACCESS_KEY,
      secretAccessKey: environment.AWS_S3_SECRET_ACCESS_KEY,
    },
  });
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private notificationsService: NotificationsService
  ) {}

  async upload(
    storage_folder: string,
    fileName: string,
    file: Buffer
  ): Promise<any> {
    const FileName =
      Math.floor(123652254 + Math.random() * 95465156).toString() +
      fileName.replace(/\s+/g, '');
    const db_access = this.cookieService.get('a_t');
    await this.s3Client.send(
      new PutObjectCommand({
        ACL: 'public-read',
        Bucket: 'prospecfy',
        Key: `${db_access}/${storage_folder}/${FileName}`,
        Body: file,
      })
    );
    return {
      url: `https://prospecfy.s3.us-west-2.amazonaws.com/${db_access}/${storage_folder}/${FileName}`,
      fileName: FileName,
    };
  }

  async post_s3(storage_folder: string, form_data: FormData): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const result = await firstValueFrom(
        this.http.post<any>(
          `${environment.ApiUrl}/aws-s3/upload/${db_access}/${storage_folder}`,
          form_data
        )
      );
      return result;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }

  async delete_s3(storage_folder: string, fileName: string): Promise<any> {
    try {
      const db_access = this.cookieService.get('a_t');
      const result = await firstValueFrom(
        this.http.delete<any>(
          `${environment.ApiUrl}/aws-s3/delete/${db_access}/${storage_folder}/${fileName}`
        )
      );
      return result.url;
    } catch (e: any) {
      this.notificationsService.ErrorNotification(
        e?.error?.statusCode ? e?.error?.statusCode : 500,
        e?.error?.message ? e?.error?.message : 'Error connect to server'
      );
    }
  }
}

// import {
//   CreateBucketCommand,
//   DeleteObjectCommand,
//   PutObjectCommand,
//   S3Client,
// } from '@aws-sdk/client-s3';
// import { HttpStatus, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { config } from 'rxjs';

// @Injectable()
// export class AwsS3Service {
//   private readonly s3Client = new S3Client({
//     region: this.configService.getOrThrow('AWS_S3_REGION'),
//     credentials: {
//       accessKeyId: this.configService.getOrThrow('AWS_S3_ACCESS_KEY'),
//       secretAccessKey: this.configService.getOrThrow(
//         'AWS_S3_SECRET_ACCESS_KEY',
//       ),
//     },
//   });

//   constructor(private readonly configService: ConfigService) {}

//   async upload(
//     db_access: string,
//     storage_folder: string,
//     fileName: string,
//     file: Buffer,
//   ): Promise<any> {
//     const FileName =
//       Math.floor(123652254 + Math.random() * 95465156).toString() +
//       fileName.replace(/\s+/g, '');

//     await this.s3Client.send(
//       new PutObjectCommand({
//         ACL: 'public-read',
//         Bucket: 'prospecfy',
//         Key: `${db_access}/${storage_folder}/${FileName}`,
//         Body: file,
//       }),
//     );
//     return {
//       url: `https://prospecfy.s3.us-west-2.amazonaws.com/${db_access}/${storage_folder}/${FileName}`,
//       fileName: FileName,
//     };
//   }

//   async DeleteObject(
//     db_access: string,
//     storage_folder: string,
//     fileName: string,
//   ): Promise<any> {
//     await this.s3Client.send(
//       new DeleteObjectCommand({
//         Bucket: 'prospecfy',
//         Key: `${db_access}/${storage_folder}/${fileName}`,
//       }),
//     );
//     return {
//       status: HttpStatus.OK,
//     };
//   }

//   async crateBucket(business: string): Promise<any> {
//     const client = new S3Client(config);
//     const input = {
//       // CreateBucketRequest
//       ACL:
//         'private' ||
//         'public-read' ||
//         'public-read-write' ||
//         'authenticated-read',
//       Bucket: business, // required
//       CreateBucketConfiguration: {
//         // CreateBucketConfiguration
//         LocationConstraint: 'us-west-2',
//       },
//     };
//     const command = new CreateBucketCommand(input);
//     const response = await client.send(command);
//   }
// }

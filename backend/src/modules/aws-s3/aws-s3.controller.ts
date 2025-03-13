// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { AwsS3Service } from './aws-s3.service';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('aws-s3')
// export class AwsS3Controller {
//   constructor(private readonly awsS3Service: AwsS3Service) {}

//   @Post('upload/:db_access/:storage_folder')
//   @UseInterceptors(FileInterceptor('file'))
//   uploadFile(
//     @Param('db_access') db_access,
//     @Param('storage_folder') storage_folder,
//     @UploadedFile() file: Express.Multer.File,
//   ) {
//     return this.awsS3Service.upload(
//       db_access,
//       storage_folder,
//       file.originalname,
//       file.buffer,
//     );
//   }

//   @Delete('delete/:db_access/:storage_folder/:fileName')
//   DeleteFile(
//     @Param('db_access') db_access,
//     @Param('storage_folder') storage_folder,
//     @Param('fileName') fileName,
//   ) {
//     return this.awsS3Service.DeleteObject(db_access, storage_folder, fileName);
//   }
// }

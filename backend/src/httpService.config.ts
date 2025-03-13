import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpConfigService implements HttpModuleOptionsFactory {
  createHttpOptions(): HttpModuleOptions | Promise<HttpModuleOptions> {
    return {
      headers: {
        Authorization:
          'Bearer EAAVyU3UvbxoBO1WU7i26cU4TyRs7et0nrL7IcVXH5ORAmLGT9CzF7ZBA0EPRF936DGAcR7S6JZCWZCmARIBsazog0DDoxRWNfnzZBl0OIEheOjJndPZB4Ybev84TJUpCqpppjx8v711rYxgZBbbP23i1lUWQJ33SFQwvdCro7ZACmn3zK7bXKZAlYYzTdkxTNUlY',
        'Content-Type': 'application/json',
      },
    };
  }
}

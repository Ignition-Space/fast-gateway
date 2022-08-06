import { Injectable } from '@nestjs/common';

import { WebSiteDataModel } from './types';
import { getMatchedSync } from './intercepter';
import { ConfigService } from '@nestjs/config';
import { readMatchedFileSync, writeFileSync } from './fileSysCache';
import * as WebsitesMock from './websites_mock.json';
import * as FilesMock from './files_mock.json';

console.log(WebsitesMock)

@Injectable()
export class IntercepterService {

  constructor(private readonly configService: ConfigService) { }

  get websites(): Record<string, WebSiteDataModel> {
    // return this.configService.get('WEBSITES');
    return WebsitesMock as Record<string, WebSiteDataModel>
  }

  async readHtml(urlObj: URL) {
    const { data: matchedData, path: matchedPath } = getMatchedSync(urlObj, this.websites);
    // const html = await this.configService.get(matchedPath);

    if (!matchedData) return null

    const html = FilesMock[matchedData.pageId]
    // writeFileSync(urlObj.hostname, matchedPath, html);
    return html;
  }
}

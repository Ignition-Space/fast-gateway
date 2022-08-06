import { Public } from '@/auth/constants';
import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Query,
  Body,
  HostParam,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { URL } from 'url';
import { IntercepterService } from './intercepter.service';

@Controller()
export class IntercepterController {
  constructor(private readonly intercepterService: IntercepterService) { }

  @Get('*')
  @Public()
  async getApp(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    console.log(urlObj)
    if (urlObj.pathname === '/favicon.ico') return res.send('ico');

    const html = await this.intercepterService.readHtml(urlObj);

    if (!html) return res.send('404');

    res.headers({
      'Content-Type': 'text/html',
    });
    res.send(html);
  }
}

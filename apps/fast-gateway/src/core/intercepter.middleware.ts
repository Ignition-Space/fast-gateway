import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class IntercepterMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { host } = req.headers;
    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    next();
  }
}

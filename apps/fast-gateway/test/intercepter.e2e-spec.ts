import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { IntercepterModule } from '../src/core/intercepter.module'
import { ConfigService, ConfigModule } from '@nestjs/config';
import { getConfig } from '../src/utils/index';

describe('Cats', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IntercepterModule,
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true,
          load: [getConfig]
        }),],
      // providers: [ConfigService],
    }).compile();

    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/GET devops`, () => {
    return request(app.getHttpServer())
      .get('/devops')
      .set('host', 'www.cookieboty.com')
      .expect(200)
      .expect('devops');
  });

  it(`/GET jenkins`, () => {
    return request(app.getHttpServer())
      .get('/jenkins')
      .set('host', 'www.cookieboty.com')
      .expect(200)
      .expect('jenkins');
  });

  it(`/GET 404`, () => {
    return request(app.getHttpServer())
      .get('/jenk')
      .set('host', 'www.cookieboty.com')
      .expect(200)
      .expect('404');
  });

  it(`/GET nginx`, () => {
    return request(app.getHttpServer())
      .get('/nginx')
      .set('host', 'www.cookieboty.com')
      .expect(200)
      .expect('nginx');
  });

  afterAll(async () => {
    await app.close();
  });
});
import { IntercepterController } from './intercepter.controller';
import { IntercepterService } from './intercepter.service'
import { IntercepterModule } from './intercepter.module'
import { ConfigModule } from '@nestjs/config';
import { getConfig } from '@app/common';
import { mockRequest, mockResponse } from 'mock-req-res';
import { Test } from '@nestjs/testing';


describe('IntercepterController', () => {

  let intercepterController: IntercepterController;
  let intercepterService: IntercepterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [IntercepterModule,
        ConfigModule.forRoot({
          ignoreEnvFile: true,
          isGlobal: true,
          load: [getConfig]
        }),],
    }).compile();

    intercepterService = moduleRef.get<IntercepterService>(IntercepterService);
    intercepterController = moduleRef.get<IntercepterController>(IntercepterController);
  });

  describe('getTest', () => {
    it('should return test', async () => {
      const result = 'test';
      expect(await intercepterController.getTest()).toBe(result);
    });
  });

  describe('getApp', () => {
    it('should return devops', async () => {
      const req = mockRequest({
        headers: {
          host: 'www.cookieboty.com'
        },
        url: '/devops'
      })
      const res = mockResponse({
        headers: () => { },
        send: d => d
      })
      const result = 'devops';
      expect(await intercepterController.getApp(req, res)).toBe(result);
    });
  });

});

// describe('IntercepterController', () => {

//   let intercepterController: IntercepterController;
//   let intercepterService: IntercepterService;
//   let configService: ConfigService;

//   beforeEach(() => {
//     configService = new ConfigService({
//       isGlobal: true,
//       load: [getConfig]
//     })

//     intercepterService = new IntercepterService(configService);
//     intercepterController = new IntercepterController(intercepterService);

//   });

//   describe('getTest', () => {
//     it('should return test', async () => {
//       const result = 'test';
//       expect(await intercepterController.getTest()).toBe(result);
//     });
//   });

//   describe('getApp', () => {
//     it('should return devops', async () => {
//       const req = mockRequest({
//         headers: {
//           host: 'www.cookieboty.com'
//         },
//         url: '/devops'
//       })
//       const res = mockResponse({
//         headers: () => { },
//         send: d => d
//       })
//       const result = 'devops';
//       expect(await intercepterController.getApp(req, res)).toBe(result);
//     });
//   });

// });
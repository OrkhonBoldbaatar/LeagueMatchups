import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],

      providers: [AppService],
    }).compile();
    appController = app.get<AppController>(AppController);
    appService = app.get(AppService);
  });

  describe('posture webhook', () => {
    it('should have ran postureCheck once!', async () => {
      const spy = jest
        .spyOn(appService, 'postureCheck')
        .mockResolvedValue(undefined);
      await appController.sendPostureCheck();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});

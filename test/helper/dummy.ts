import { Type } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export const describeDummyControllerTest =
  <TCtlClass = any>(
    ctlClass: Type<TCtlClass>,
    ctlName: string
  ) =>
    describe(`${ctlName} Controller dummy test`, () => {
      let module: TestingModule;

      beforeAll(async () => {
        module = await Test.createTestingModule({
          controllers: [ctlClass],
        }).compile();
      });

      it('should be defined', () => {
        const controller: TCtlClass = module.get<TCtlClass>(ctlClass);
        expect(controller).toBeDefined();
      });
    });

export const describeDummyServiceTest =
  <TServiceClass = any>(
    serviceClass: Type<TServiceClass>,
    serviceName: string,
  ) =>
    describe(`${serviceName} Service dummy test`, () => {
      let service: TServiceClass;

      beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
          providers: [serviceClass],
        }).compile();
        service = module.get<TServiceClass>(serviceClass);
      });

      it('should be defined', () => {
        expect(service).toBeDefined();
      });
    });

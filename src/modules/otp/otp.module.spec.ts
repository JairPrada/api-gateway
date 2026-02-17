import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { OtpModule } from './otp.module';
import { ValidateOtpUseCase, ResendOtpUseCase } from './core/use-cases';
import { OtpRepository } from './repository';

describe('OtpModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OtpModule],
    }).compile();
  });

  it('should compile the module', () => {
    expect(module).toBeDefined();
  });

  it('should provide ValidateOtpUseCase', () => {
    const useCase = module.get<ValidateOtpUseCase>(ValidateOtpUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide ResendOtpUseCase', () => {
    const useCase = module.get<ResendOtpUseCase>(ResendOtpUseCase);
    expect(useCase).toBeDefined();
  });

  it('should provide OtpRepository', () => {
    const repository = module.get<OtpRepository>(OtpRepository);
    expect(repository).toBeDefined();
  });
});

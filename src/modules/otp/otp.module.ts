import { Module } from '@nestjs/common';
import { OtpController } from './services';
import {
  ValidateOtpUseCase,
  ValidateOtpUseCaseImpl,
  ResendOtpUseCase,
  ResendOtpUseCaseImpl,
} from './core/use-cases';
import { OtpRepository, OtpRepositoryMock } from './repository';

@Module({
  controllers: [OtpController],
  providers: [
    {
      provide: OtpRepository,
      useClass: OtpRepositoryMock,
    },
    {
      provide: ValidateOtpUseCase,
      useClass: ValidateOtpUseCaseImpl,
    },
    {
      provide: ResendOtpUseCase,
      useClass: ResendOtpUseCaseImpl,
    },
  ],
  exports: [ValidateOtpUseCase, ResendOtpUseCase],
})
export class OtpModule {}

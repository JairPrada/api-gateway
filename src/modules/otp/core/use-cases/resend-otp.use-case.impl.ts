import { Injectable, Logger } from '@nestjs/common';
import { ResendOtpUseCase } from './resend-otp.use-case';
import { OtpRepository } from '../../repository/otp.repository';

@Injectable()
export class ResendOtpUseCaseImpl implements ResendOtpUseCase {
  private readonly logger = new Logger(ResendOtpUseCaseImpl.name);

  constructor(private readonly otpRepository: OtpRepository) {}

  execute(): { message: string } {
    this.logger.log('Resending OTP');
    return this.otpRepository.resendOtp();
  }
}

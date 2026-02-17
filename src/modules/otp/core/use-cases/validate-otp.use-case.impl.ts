import { Injectable, Logger } from '@nestjs/common';
import { ValidateOtpUseCase } from './validate-otp.use-case';
import { OtpRepository } from '../../repository/otp.repository';
import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../../dto';

@Injectable()
export class ValidateOtpUseCaseImpl implements ValidateOtpUseCase {
  private readonly logger = new Logger(ValidateOtpUseCaseImpl.name);

  constructor(private readonly otpRepository: OtpRepository) {}

  execute(dto: ValidateOtpRequestDto): ValidateOtpResponseDto {
    this.logger.log(`Validating OTP: ${dto.otp.substring(0, 2)}****`);
    return this.otpRepository.validateOtp(dto);
  }
}

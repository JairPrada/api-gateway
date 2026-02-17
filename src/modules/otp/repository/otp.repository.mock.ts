import { Injectable } from '@nestjs/common';
import { OtpRepository } from './otp.repository';
import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../dto';

@Injectable()
export class OtpRepositoryMock implements OtpRepository {
  validateOtp(_dto: ValidateOtpRequestDto): ValidateOtpResponseDto {
    return {
      valid: true,
      message: 'OTP validado correctamente',
      accessToken: 'mock-jwt-token-after-otp',
    };
  }

  resendOtp(): { message: string } {
    return {
      message: 'OTP reenviado exitosamente',
    };
  }
}

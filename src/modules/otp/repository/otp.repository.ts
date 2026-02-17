import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../dto';

export abstract class OtpRepository {
  abstract validateOtp(dto: ValidateOtpRequestDto): ValidateOtpResponseDto;
  abstract resendOtp(): { message: string };
}

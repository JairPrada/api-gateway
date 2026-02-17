import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../../dto';

export abstract class ValidateOtpUseCase {
  abstract execute(dto: ValidateOtpRequestDto): ValidateOtpResponseDto;
}

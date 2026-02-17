import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ValidateOtpUseCase, ResendOtpUseCase } from '../core/use-cases';
import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../dto';

@ApiTags('OTP')
@ApiBearerAuth()
@Controller('otp')
export class OtpController {
  constructor(
    private readonly validateOtpUseCase: ValidateOtpUseCase,
    private readonly resendOtpUseCase: ResendOtpUseCase,
  ) {}

  @Post('validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validar código OTP' })
  @ApiResponse({
    status: 200,
    description: 'OTP validado correctamente',
    type: ValidateOtpResponseDto,
  })
  @ApiResponse({ status: 400, description: 'OTP inválido o expirado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  validateOtp(@Body() dto: ValidateOtpRequestDto): ValidateOtpResponseDto {
    return this.validateOtpUseCase.execute(dto);
  }

  @Post('resend')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reenviar código OTP' })
  @ApiResponse({ status: 200, description: 'OTP reenviado' })
  @ApiResponse({ status: 429, description: 'Demasiadas solicitudes' })
  resendOtp(): { message: string } {
    return this.resendOtpUseCase.execute();
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class ApplicationResponseDto {
  @ApiProperty({ example: 'app-uuid-1234' })
  applicationId!: string;

  @ApiProperty({ example: 'pending_otp' })
  status!: string;

  @ApiProperty({ example: 'OTP enviado al correo registrado' })
  message!: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class ValidateOtpResponseDto {
  @ApiProperty({ example: true })
  valid!: boolean;

  @ApiProperty({ example: 'OTP validado correctamente' })
  message!: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  accessToken?: string;
}

import { IsString, IsNotEmpty, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateOtpRequestDto {
  @ApiProperty({
    description: 'Código OTP de 6 dígitos',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 6)
  otp!: string;
}

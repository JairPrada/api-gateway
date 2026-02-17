import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description: 'Número de documento (cédula) del usuario',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'SecurePass123!',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}

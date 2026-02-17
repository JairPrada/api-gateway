import {
  IsString,
  IsNumber,
  IsNotEmpty,
  MinLength,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty({
    description: 'Número de documento (cédula) del usuario',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez García',
  })
  @IsString()
  @IsNotEmpty()
  fullName!: string;

  @ApiProperty({
    description: 'Ciudad de residencia',
    example: 'Bogotá',
  })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({
    description: 'Ingreso mensual en pesos',
    example: 3500000,
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  monthlyIncome!: number;

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'SecurePass123!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password!: string;
}

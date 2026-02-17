import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StartApplicationRequestDto {
  @ApiProperty({
    description: 'Número de identificación del solicitante',
    example: '1234567890',
  })
  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @ApiProperty({
    description: 'Acepta tratamiento de datos personales',
    example: true,
  })
  @IsBoolean()
  acceptsDataTreatment!: boolean;
}

import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductRequestDto {
  @ApiProperty({
    description: 'ID del producto a crear/seleccionar',
    example: 'prod-credit-card-gold',
  })
  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsString()
  @IsNotEmpty()
  documentNumber!: string;

  @IsString()
  @IsNotEmpty()
  userId!: string;
}

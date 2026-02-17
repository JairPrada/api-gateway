import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import {
  GetProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../core/use-cases';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';

@ApiTags('Productos')
@ApiBearerAuth()
@Controller('product')
export class ProductsController {
  constructor(
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos',
    type: [ProductResponseDto],
  })
  async getProducts(
    @Param('userId') userId: string,
  ): Promise<ProductResponseDto[]> {
    return this.getProductsUseCase.execute(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.getProductByIdUseCase.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear/seleccionar un producto' })
  @ApiResponse({
    status: 201,
    description: 'Producto creado',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async createProduct(
    @Body() dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.createProductUseCase.execute(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado',
    type: ProductResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async updateProduct(
    @Param('id') id: string,
    @Body() dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }
}

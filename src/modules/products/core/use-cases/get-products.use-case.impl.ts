import { Injectable, Logger } from '@nestjs/common';
import { GetProductsUseCase } from './get-products.use-case';
import { ProductsRepository } from '../../repository/products.repository';
import { ProductResponseDto } from '../../dto';

@Injectable()
export class GetProductsUseCaseImpl implements GetProductsUseCase {
  private readonly logger = new Logger(GetProductsUseCaseImpl.name);

  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(userId: string): Promise<ProductResponseDto[]> {
    this.logger.log(`Fetching products for user ID: ${userId}`);
    return this.productsRepository.getProductsByUserId(userId);
  }
}

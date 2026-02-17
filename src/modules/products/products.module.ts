/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsController } from './services';
import {
  GetProductsUseCase,
  GetProductsUseCaseImpl,
  GetProductByIdUseCase,
  GetProductByIdUseCaseImpl,
  CreateProductUseCase,
  CreateProductUseCaseImpl,
  UpdateProductUseCase,
  UpdateProductUseCaseImpl,
  DeleteProductUseCase,
  DeleteProductUseCaseImpl,
} from './core/use-cases';
import { ProductsRepository, ProductsRepositoryHttp } from './repository';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [
    {
      provide: ProductsRepository,
      useClass: ProductsRepositoryHttp,
    },
    {
      provide: GetProductsUseCase,
      useClass: GetProductsUseCaseImpl,
    },
    {
      provide: GetProductByIdUseCase,
      useClass: GetProductByIdUseCaseImpl,
    },
    {
      provide: CreateProductUseCase,
      useClass: CreateProductUseCaseImpl,
    },
    {
      provide: UpdateProductUseCase,
      useClass: UpdateProductUseCaseImpl,
    },
    {
      provide: DeleteProductUseCase,
      useClass: DeleteProductUseCaseImpl,
    },
  ],
  exports: [
    GetProductsUseCase,
    GetProductByIdUseCase,
    CreateProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class ProductsModule {}

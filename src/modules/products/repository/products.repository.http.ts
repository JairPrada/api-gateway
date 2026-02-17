/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ProductsRepository } from './products.repository';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';

@Injectable()
export class ProductsRepositoryHttp implements ProductsRepository {
  private readonly logger = new Logger(ProductsRepositoryHttp.name);
  private readonly baseUrl = 'http://localhost:4000/products';

  constructor(private readonly httpService: HttpService) {}

  async getProductsByUserId(userId: string): Promise<ProductResponseDto[]> {
    this.logger.log(`Calling microservice: GET ${this.baseUrl}/user/${userId}`);

    const response = await firstValueFrom(
      this.httpService.get<ProductResponseDto[]>(
        `${this.baseUrl}/product/user/${userId}`,
      ),
    );

    return response.data;
  }

  async getProducts(userId: string): Promise<ProductResponseDto[]> {
    this.logger.log(
      `Calling microservice: GET ${this.baseUrl}/product/user/${userId}`,
    );

    const response = await firstValueFrom(
      this.httpService.get<ProductResponseDto[]>(
        `${this.baseUrl}/product/user/${userId}`,
      ),
    );

    return response.data;
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    this.logger.log(`Calling microservice: GET ${this.baseUrl}/${id}`);

    const response = await firstValueFrom(
      this.httpService.get<ProductResponseDto>(`${this.baseUrl}/${id}`),
    );

    return response.data;
  }

  async createProduct(
    dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    console.log('🚀 ~ ProductsRepositoryHttp ~ createProduct ~ dto:', dto);
    this.logger.log(`Calling microservice: POST ${this.baseUrl}/products`);

    const products = {
      'savings-account': {
        name: 'Cuenta de Ahorros Premium',
        type: 'savings',
        description: 'Cuenta con los mejores beneficios',
        balance: '$0',
        limit: '$1,000,000',
        rate: '4.5% EA',
      },
      'credit-card': {
        name: 'Tarjeta de Credito Gold',
        type: 'credit',
        description: 'Tarjeta con los mejores beneficios',
        balance: '$0',
        limit: '$10,000,000',
        rate: '4.5% EA',
      },
      'free-investment': {
        name: 'Prestamo Personal',
        type: 'loan',
        description: 'Prestamo con los mejores beneficios',
        balance: '$0',
        limit: '$990,000,000',
        rate: '4.5% EA',
      },
    };

    const body = {
      ...products[dto.productId],
      userId: dto.userId,
    };

    const response = await firstValueFrom(
      this.httpService.post<ProductResponseDto>(
        `${this.baseUrl}/product`,
        body,
      ),
    );

    return response.data;
  }

  async updateProduct(
    id: string,
    dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    this.logger.log(`Calling microservice: PUT ${this.baseUrl}/product/${id}`);

    const response = await firstValueFrom(
      this.httpService.put<ProductResponseDto>(
        `${this.baseUrl}/product/${id}`,
        dto,
      ),
    );

    return response.data;
  }

  async deleteProduct(id: string): Promise<void> {
    this.logger.log(
      `Calling microservice: DELETE ${this.baseUrl}/product/${id}`,
    );
    await firstValueFrom(
      this.httpService.delete(`${this.baseUrl}/product/${id}`),
    );
  }
}

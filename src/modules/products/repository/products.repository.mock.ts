/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import {
  CreateProductRequestDto,
  UpdateProductRequestDto,
  ProductResponseDto,
} from '../dto';

@Injectable()
export class ProductsRepositoryMock implements ProductsRepository {
  private readonly mockProducts: ProductResponseDto[] = [
    {
      id: '1',
      name: 'Cuenta Digital',
      type: 'savings',
      description: 'Sin comisiones de manejo, 100% digital.',
      accountNumber: '****7821',
      balance: '$8,320,000',
      status: 'active',
      lastMovement: 'Hoy, 9:15 AM',
      rate: '4.0% EA',
    },
    {
      id: '2',
      name: 'Cuenta de Ahorro Premium',
      type: 'savings',
      description: 'Haz crecer tu dinero con las mejores tasas de interés.',
      accountNumber: '****4532',
      balance: '$12,450,000',
      status: 'active',
      lastMovement: 'Ayer, 3:45 PM',
      rate: '4.5% EA',
    },
    {
      id: '3',
      name: 'Tarjeta Clásica',
      type: 'credit',
      description: 'Accede a beneficios exclusivos y cashback.',
      accountNumber: '****1234',
      balance: '$1,250,000',
      limit: '$8,000,000',
      status: 'active',
      lastMovement: 'Hace 3 días',
    },
    {
      id: '4',
      name: 'Tarjeta de Crédito Gold',
      type: 'credit',
      description: 'Beneficios premium, millas y financiamiento flexible.',
      accountNumber: '****5678',
      balance: '$2,150,000',
      limit: '$15,000,000',
      status: 'active',
      lastMovement: 'Hace 2 días',
    },
    {
      id: '5',
      name: 'Crédito Libre Inversión',
      type: 'loan',
      description: 'Financia tus proyectos con tasas preferenciales.',
      balance: '$18,500,000',
      status: 'active',
      rate: '1.2% MV',
      lastMovement: 'Cuota: 15 de cada mes',
    },
    {
      id: '6',
      name: 'Crédito de Vehículo',
      type: 'loan',
      description: 'Tu carro nuevo con las mejores condiciones.',
      balance: '$45,000,000',
      status: 'active',
      rate: '0.95% MV',
      lastMovement: 'Cuota: 5 de cada mes',
    },
  ];

  async getProducts(): Promise<ProductResponseDto[]> {
    return this.mockProducts;
  }

  async getProductsByUserId(_userId: string): Promise<ProductResponseDto[]> {
    return this.mockProducts;
  }

  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = this.mockProducts.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  async createProduct(
    dto: CreateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const product = this.mockProducts.find((p) => p.id === dto.productId);
    if (product) {
      return { ...product, status: 'pending' };
    }
    return {
      id: dto.productId,
      name: 'Producto Seleccionado',
      type: 'savings',
      balance: '$0',
      status: 'pending',
    };
  }

  async updateProduct(
    id: string,
    dto: UpdateProductRequestDto,
  ): Promise<ProductResponseDto> {
    const product = await this.getProductById(id);
    return {
      ...product,
      ...dto,
    };
  }

  async deleteProduct(id: string): Promise<void> {
    await this.getProductById(id);
  }
}

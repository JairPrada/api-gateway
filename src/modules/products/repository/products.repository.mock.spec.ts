import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsRepositoryMock } from './products.repository.mock';
import { CreateProductRequestDto, UpdateProductRequestDto } from '../dto';

describe('ProductsRepositoryMock', () => {
  let repository: ProductsRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsRepositoryMock],
    }).compile();

    repository = module.get<ProductsRepositoryMock>(ProductsRepositoryMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return array of products', () => {
      const result = repository.getProducts();

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return products with required properties', () => {
      const result = repository.getProducts();
      const product = result[0];

      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.type).toBeDefined();
      expect(product.status).toBeDefined();
    });
  });

  describe('getProductById', () => {
    it('should return product by id', () => {
      const result = repository.getProductById('1');

      expect(result).toBeDefined();
      expect(result.id).toBe('1');
      expect(result.name).toBe('Cuenta Digital');
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => repository.getProductById('non-existent')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('createProduct', () => {
    it('should return existing product with pending status when found', () => {
      const dto: CreateProductRequestDto = {
        productId: '1',
      };

      const result = repository.createProduct(dto);

      expect(result).toBeDefined();
      expect(result.status).toBe('pending');
    });

    it('should return new product when id not found', () => {
      const dto: CreateProductRequestDto = {
        productId: 'new-product-id',
      };

      const result = repository.createProduct(dto);

      expect(result).toBeDefined();
      expect(result.id).toBe('new-product-id');
      expect(result.status).toBe('pending');
    });
  });

  describe('updateProduct', () => {
    it('should return updated product', () => {
      const dto: UpdateProductRequestDto = {
        name: 'Updated Name',
        description: 'Updated Description',
      };

      const result = repository.updateProduct('1', dto);

      expect(result).toBeDefined();
      expect(result.name).toBe('Updated Name');
      expect(result.description).toBe('Updated Description');
    });

    it('should throw NotFoundException for non-existent id', () => {
      const dto: UpdateProductRequestDto = {
        name: 'Updated Name',
      };

      expect(() => repository.updateProduct('non-existent', dto)).toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteProduct', () => {
    it('should not throw for existing product', () => {
      expect(() => repository.deleteProduct('1')).not.toThrow();
    });

    it('should throw NotFoundException for non-existent id', () => {
      expect(() => repository.deleteProduct('non-existent')).toThrow(
        NotFoundException,
      );
    });
  });
});

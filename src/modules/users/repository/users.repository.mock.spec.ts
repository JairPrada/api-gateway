import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryMock } from './users.repository.mock';
import { RegisterRequestDto } from '../dto';

describe('UsersRepositoryMock', () => {
  let repository: UsersRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersRepositoryMock],
    }).compile();

    repository = module.get<UsersRepositoryMock>(UsersRepositoryMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('register', () => {
    it('should return mock user response with provided data', async () => {
      const registerDto: RegisterRequestDto = {
        fullName: 'Juan Pérez',
        city: 'Bogotá',
        monthlyIncome: 3500000,
        password: 'SecurePass123!',
      };

      const result = await repository.register(registerDto);

      expect(result).toBeDefined();
      expect(result.id).toBe('user-uuid-mock');
      expect(result.fullName).toBe('Juan Pérez');
      expect(result.city).toBe('Bogotá');
      expect(result.createdAt).toBeInstanceOf(Date);
    });

    it('should return different fullName and city based on input', async () => {
      const registerDto: RegisterRequestDto = {
        fullName: 'María López',
        city: 'Medellín',
        monthlyIncome: 5000000,
        password: 'AnotherPass456!',
      };

      const result = await repository.register(registerDto);

      expect(result.fullName).toBe('María López');
      expect(result.city).toBe('Medellín');
    });
  });
});

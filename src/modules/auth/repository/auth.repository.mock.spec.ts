import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepositoryMock } from './auth.repository.mock';
import { LoginRequestDto } from '../dto';

describe('AuthRepositoryMock', () => {
  let repository: AuthRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepositoryMock],
    }).compile();

    repository = module.get<AuthRepositoryMock>(AuthRepositoryMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('login', () => {
    it('should return mock login response', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '1234567890',
        passwordHash: 'hashedPassword123',
      };

      const result = await repository.login(loginDto);

      expect(result).toBeDefined();
      expect(result.accessToken).toBe('mock-jwt-token');
      expect(result.fullName).toBe('Usuario Demo');
      expect(result.isRegistered).toBe(true);
    });

    it('should return consistent response for any credentials', async () => {
      const loginDto: LoginRequestDto = {
        documentNumber: '9999999999',
        passwordHash: 'anotherHash',
      };

      const result = await repository.login(loginDto);

      expect(result.accessToken).toBeDefined();
      expect(result.isRegistered).toBe(true);
    });
  });
});

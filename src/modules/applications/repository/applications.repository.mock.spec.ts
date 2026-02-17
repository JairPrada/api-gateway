import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsRepositoryMock } from './applications.repository.mock';
import { StartApplicationRequestDto } from '../dto';

describe('ApplicationsRepositoryMock', () => {
  let repository: ApplicationsRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationsRepositoryMock],
    }).compile();

    repository = module.get<ApplicationsRepositoryMock>(
      ApplicationsRepositoryMock,
    );
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('startApplication', () => {
    it('should return mock application response', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '1234567890',
        acceptsDataTreatment: true,
      };

      const result = repository.startApplication(dto);

      expect(result).toBeDefined();
      expect(result.applicationId).toBe('app-uuid-mock');
      expect(result.status).toBe('pending_otp');
      expect(result.message).toBe('OTP enviado al correo registrado');
    });

    it('should return consistent response for any input', () => {
      const dto: StartApplicationRequestDto = {
        documentNumber: '9876543210',
        acceptsDataTreatment: true,
      };

      const result = repository.startApplication(dto);

      expect(result.applicationId).toBeDefined();
      expect(result.status).toBe('pending_otp');
    });
  });
});

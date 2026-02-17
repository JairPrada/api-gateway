import { describe, it, expect, beforeEach } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { OtpRepositoryMock } from './otp.repository.mock';
import { ValidateOtpRequestDto } from '../dto';

describe('OtpRepositoryMock', () => {
  let repository: OtpRepositoryMock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtpRepositoryMock],
    }).compile();

    repository = module.get<OtpRepositoryMock>(OtpRepositoryMock);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('validateOtp', () => {
    it('should return mock validation response', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '123456',
      };

      const result = repository.validateOtp(dto);

      expect(result).toBeDefined();
      expect(result.valid).toBe(true);
      expect(result.message).toBe('OTP validado correctamente');
      expect(result.accessToken).toBe('mock-jwt-token-after-otp');
    });

    it('should return valid response for any OTP code', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '999999',
      };

      const result = repository.validateOtp(dto);

      expect(result.valid).toBe(true);
      expect(result.accessToken).toBeDefined();
    });
  });

  describe('resendOtp', () => {
    it('should return success message', () => {
      const result = repository.resendOtp();

      expect(result).toBeDefined();
      expect(result.message).toBe('OTP reenviado exitosamente');
    });
  });
});

import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { OtpController } from './otp.controller';
import { ValidateOtpUseCase, ResendOtpUseCase } from '../core/use-cases';
import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../dto';

describe('OtpController', () => {
  let controller: OtpController;

  const mockValidateOtpUseCase = {
    execute: jest.fn(),
  };

  const mockResendOtpUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtpController],
      providers: [
        {
          provide: ValidateOtpUseCase,
          useValue: mockValidateOtpUseCase,
        },
        {
          provide: ResendOtpUseCase,
          useValue: mockResendOtpUseCase,
        },
      ],
    }).compile();

    controller = module.get<OtpController>(OtpController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('validateOtp', () => {
    it('should call validateOtpUseCase.execute and return response', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '123456',
      };

      const expectedResponse: ValidateOtpResponseDto = {
        valid: true,
        message: 'OTP validado',
        accessToken: 'jwt-token',
      };

      mockValidateOtpUseCase.execute.mockReturnValue(expectedResponse);

      const result = controller.validateOtp(dto);

      expect(mockValidateOtpUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from use case', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '123456',
      };

      mockValidateOtpUseCase.execute.mockImplementation(() => {
        throw new Error('Invalid OTP');
      });

      expect(() => controller.validateOtp(dto)).toThrow('Invalid OTP');
    });
  });

  describe('resendOtp', () => {
    it('should call resendOtpUseCase.execute and return response', () => {
      const expectedResponse = { message: 'OTP reenviado' };

      mockResendOtpUseCase.execute.mockReturnValue(expectedResponse);

      const result = controller.resendOtp();

      expect(mockResendOtpUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate errors from use case', () => {
      mockResendOtpUseCase.execute.mockImplementation(() => {
        throw new Error('Too many requests');
      });

      expect(() => controller.resendOtp()).toThrow('Too many requests');
    });
  });
});

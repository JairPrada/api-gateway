import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ResendOtpUseCaseImpl } from './resend-otp.use-case.impl';
import { ResendOtpUseCase } from './resend-otp.use-case';
import { OtpRepository } from '../../repository/otp.repository';

describe('ResendOtpUseCaseImpl', () => {
  let useCase: ResendOtpUseCase;

  const mockOtpRepository = {
    validateOtp: jest.fn(),
    resendOtp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ResendOtpUseCase,
          useClass: ResendOtpUseCaseImpl,
        },
        {
          provide: OtpRepository,
          useValue: mockOtpRepository,
        },
      ],
    }).compile();

    useCase = module.get<ResendOtpUseCase>(ResendOtpUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call otpRepository.resendOtp and return response', () => {
      const expectedResponse = { message: 'OTP reenviado' };

      mockOtpRepository.resendOtp.mockReturnValue(expectedResponse);

      const result = useCase.execute();

      expect(mockOtpRepository.resendOtp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate repository errors', () => {
      mockOtpRepository.resendOtp.mockImplementation(() => {
        throw new Error('Too many requests');
      });

      expect(() => useCase.execute()).toThrow('Too many requests');
    });
  });
});

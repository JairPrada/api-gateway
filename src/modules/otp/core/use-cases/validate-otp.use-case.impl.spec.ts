import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  jest,
} from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { ValidateOtpUseCaseImpl } from './validate-otp.use-case.impl';
import { ValidateOtpUseCase } from './validate-otp.use-case';
import { OtpRepository } from '../../repository/otp.repository';
import { ValidateOtpRequestDto, ValidateOtpResponseDto } from '../../dto';

describe('ValidateOtpUseCaseImpl', () => {
  let useCase: ValidateOtpUseCase;

  const mockOtpRepository = {
    validateOtp: jest.fn(),
    resendOtp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ValidateOtpUseCase,
          useClass: ValidateOtpUseCaseImpl,
        },
        {
          provide: OtpRepository,
          useValue: mockOtpRepository,
        },
      ],
    }).compile();

    useCase = module.get<ValidateOtpUseCase>(ValidateOtpUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('execute', () => {
    it('should call otpRepository.validateOtp with correct parameters', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '123456',
      };

      const expectedResponse: ValidateOtpResponseDto = {
        valid: true,
        message: 'OTP validado',
        accessToken: 'jwt-token',
      };

      mockOtpRepository.validateOtp.mockReturnValue(expectedResponse);

      const result = useCase.execute(dto);

      expect(mockOtpRepository.validateOtp).toHaveBeenCalledWith(dto);
      expect(mockOtpRepository.validateOtp).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResponse);
    });

    it('should propagate repository errors', () => {
      const dto: ValidateOtpRequestDto = {
        otp: '123456',
      };

      mockOtpRepository.validateOtp.mockImplementation(() => {
        throw new Error('Invalid OTP');
      });

      expect(() => useCase.execute(dto)).toThrow('Invalid OTP');
    });
  });
});

import { Injectable } from '@nestjs/common';
import { ApplicationsRepository } from './applications.repository';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

@Injectable()
export class ApplicationsRepositoryMock implements ApplicationsRepository {
  async startApplication(_dto: StartApplicationRequestDto): Promise<ApplicationResponseDto> {
    return {
      applicationId: 'app-uuid-mock',
      status: 'pending_otp',
      message: 'OTP enviado al correo registrado',
    };
  }
}

import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { LoginRequestDto, LoginResponseDto } from '../dto';

@Injectable()
export class AuthRepositoryMock implements AuthRepository {
  login(_loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    return Promise.resolve({
      accessToken: 'mock-jwt-token',
      fullName: 'Usuario Demo',
      userId: 'Usuario Demo',
      isRegistered: true,
    });
  }
}

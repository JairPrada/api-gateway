import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AuthRepository } from './auth.repository';
import { LoginRequestDto, LoginResponseDto } from '../dto';

@Injectable()
export class AuthRepositoryHttp implements AuthRepository {
  private readonly logger = new Logger(AuthRepositoryHttp.name);
  private readonly baseUrl = 'http://localhost:4000/products/auth';

  constructor(private readonly httpService: HttpService) {}

  async login(loginDto: LoginRequestDto): Promise<LoginResponseDto> {
    this.logger.log(`Calling microservice: POST ${this.baseUrl}/login`);

    const response = await firstValueFrom(
      this.httpService.post<LoginResponseDto>(
        `${this.baseUrl}/login`,
        loginDto,
      ),
    );

    return response.data;
  }
}

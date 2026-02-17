import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { UsersRepository } from './users.repository';
import { RegisterRequestDto, UserResponseDto, UserEntity } from '../dto';

@Injectable()
export class UsersRepositoryHttp implements UsersRepository {
  private readonly logger = new Logger(UsersRepositoryHttp.name);
  private readonly baseUrl = 'http://localhost:4000/products/users';

  constructor(private readonly httpService: HttpService) {}

  async register(registerDto: RegisterRequestDto): Promise<UserResponseDto> {
    this.logger.log(`Calling microservice: POST ${this.baseUrl}/register`);

    const response = await firstValueFrom(
      this.httpService.post<UserResponseDto>(
        `${this.baseUrl}/register`,
        registerDto,
      ),
    );

    return response.data;
  }

  async findByDocumentNumber(
    documentNumber: string,
  ): Promise<UserEntity | null> {
    this.logger.log(
      `Calling microservice to find user by document: ${documentNumber}`,
    );

    try {
      const response = await firstValueFrom(
        this.httpService.get<UserEntity>(`${this.baseUrl}/${documentNumber}`),
      );
      return response.data;
    } catch (error) {
      this.logger.warn(`User not found for document: ${documentNumber}`);
      return null;
    }
  }
}

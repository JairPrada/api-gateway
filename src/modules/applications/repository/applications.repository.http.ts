import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApplicationsRepository } from './applications.repository';
import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

@Injectable()
export class ApplicationsRepositoryHttp implements ApplicationsRepository {
  private readonly logger = new Logger(ApplicationsRepositoryHttp.name);
  private readonly baseUrl = 'http://localhost:4000/products/applications';

  constructor(private readonly httpService: HttpService) {}

  async startApplication(
    dto: StartApplicationRequestDto,
  ): Promise<ApplicationResponseDto> {
    this.logger.log(`Calling microservice: POST ${this.baseUrl}`);

    const response = await firstValueFrom(
      this.httpService.post<ApplicationResponseDto>(this.baseUrl, dto),
    );

    return response.data;
  }
}

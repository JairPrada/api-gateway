import { StartApplicationRequestDto, ApplicationResponseDto } from '../dto';

export abstract class ApplicationsRepository {
  abstract startApplication(
    dto: StartApplicationRequestDto,
  ): Promise<ApplicationResponseDto>;
}

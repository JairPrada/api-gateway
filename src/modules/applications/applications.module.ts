import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ApplicationsController } from './services';
import {
  StartApplicationUseCase,
  StartApplicationUseCaseImpl,
} from './core/use-cases';
import {
  ApplicationsRepository,
  ApplicationsRepositoryHttp,
} from './repository';

@Module({
  imports: [HttpModule],
  controllers: [ApplicationsController],
  providers: [
    {
      provide: ApplicationsRepository,
      useClass: ApplicationsRepositoryHttp,
    },
    {
      provide: StartApplicationUseCase,
      useClass: StartApplicationUseCaseImpl,
    },
  ],
  exports: [StartApplicationUseCase],
})
export class ApplicationsModule {}

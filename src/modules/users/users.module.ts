import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UsersController } from './services';
import { RegisterUserUseCase, RegisterUserUseCaseImpl } from './core/use-cases';
import { UsersRepository, UsersRepositoryHttp } from './repository';

@Module({
  imports: [HttpModule],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersRepository,
      useClass: UsersRepositoryHttp,
    },
    {
      provide: RegisterUserUseCase,
      useClass: RegisterUserUseCaseImpl,
    },
  ],
  exports: [RegisterUserUseCase, UsersRepository],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './services';
import { LoginUseCase, LoginUseCaseImpl } from './core/use-cases';
import { AuthRepository, AuthRepositoryHttp } from './repository';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthRepository,
      useClass: AuthRepositoryHttp,
    },
    {
      provide: LoginUseCase,
      useClass: LoginUseCaseImpl,
    },
  ],
  exports: [LoginUseCase],
})
export class AuthModule {}

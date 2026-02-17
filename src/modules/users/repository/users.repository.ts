import { RegisterRequestDto, UserResponseDto, UserEntity } from '../dto';

export abstract class UsersRepository {
  abstract register(registerDto: RegisterRequestDto): Promise<UserResponseDto>;
  abstract findByDocumentNumber(documentNumber: string): Promise<UserEntity | null>;
}

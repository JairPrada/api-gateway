import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { RegisterRequestDto, UserResponseDto, UserEntity } from '../dto';
import * as crypto from 'crypto';

@Injectable()
export class UsersRepositoryMock implements UsersRepository {
  private users: Map<string, UserEntity> = new Map();

  register(registerDto: RegisterRequestDto): Promise<UserResponseDto> {
    const userId = crypto.randomUUID();
    const passwordHash = crypto
      .createHash('sha256')
      .update(registerDto.password)
      .digest('hex');

    const user: UserEntity = {
      id: userId,
      documentNumber: registerDto.documentNumber,
      fullName: registerDto.fullName,
      city: registerDto.city,
      monthlyIncome: registerDto.monthlyIncome,
      passwordHash,
      createdAt: new Date(),
    };

    this.users.set(registerDto.documentNumber, user);

    return Promise.resolve({
      id: user.id,
      documentNumber: user.documentNumber,
      fullName: user.fullName,
      city: user.city,
      createdAt: user.createdAt,
    });
  }

  findByDocumentNumber(documentNumber: string): Promise<UserEntity | null> {
    const user = this.users.get(documentNumber) || null;
    return Promise.resolve(user);
  }
}

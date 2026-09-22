import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async verifyUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }

    return this.userRepository.update({ id: user.id }, { emailVerified: true });
  }

  getUser(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }
}

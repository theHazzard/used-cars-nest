import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
  }

  findOne(userId: number) {
    return this.userRepo.findOne(userId);
  }

  find(email: string) {
    return this.userRepo.find({
      email,
    });
  }

  async update(userId: number, updatedUser: Partial<User>) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, updatedUser);
    return this.userRepo.save(user);
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepo.remove(user);
  }
}

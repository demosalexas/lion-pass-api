import { Injectable } from '@nestjs/common';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FolderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFolderDto: CreateFolderDto) {
    const data = {
      ...createFolderDto,
      name: await bcrypt.hash(createFolderDto.name, 10),
    };

    const folder = await this.prisma.folder.create({
      data,
    });

    return {
      ...folder,
      password: undefined,
    };
  }

  findAll() {
    return `This action returns all folder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} folder`;
  }

  update(id: number, updateFolderDto: UpdateFolderDto) {
    return `This action updates a #${id} folder`;
  }

  remove(id: number) {
    return `This action removes a #${id} folder`;
  }
}

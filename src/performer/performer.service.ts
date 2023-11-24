import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformerEntity } from './performer.entity';

@Injectable()
export class PerformerService {
  constructor(
    @InjectRepository(PerformerEntity)
    private performerRepository: Repository<PerformerEntity>,
  ) {}

  async create(performerData: Omit<PerformerEntity, 'id'>): Promise<PerformerEntity> {
    // Validar que la descripción no exceda los 100 caracteres
    if (performerData.description && performerData.description.length > 100) {
      throw new BadRequestException('La descripción no debe exceder los 100 caracteres.');
    }

    const performer = this.performerRepository.create(performerData);
    return this.performerRepository.save(performer);
  }

  async findOne(id: string): Promise<PerformerEntity> {
    const performer = await this.performerRepository.findOne({ where: { id } });
    if (!performer) {
      throw new NotFoundException(`El performer con el ID ${id} no fue encontrado.`);
    }
    return performer;
  }

  async findAll(): Promise<PerformerEntity[]> {
    return this.performerRepository.find( { relations: ['albums']});
  }
}

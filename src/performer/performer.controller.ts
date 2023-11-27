import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { CreatePerformerDto, UpdatePerformerDto } from './performer.dto';
import { PerformerEntity } from './performer.entity';

@Controller('performers')
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Post()
  async create(@Body() createPerformerDto: CreatePerformerDto): Promise<PerformerEntity> {
    return this.performerService.create(createPerformerDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.performerService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.performerService.findAll();
  }

}

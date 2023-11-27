import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto, UpdateTrackDto } from './track.dto';
import { TrackEntity } from './track.entity';

@Controller('tracks')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(
    @Param('albumId') albumId: string,
    @Body() createTrackDto: CreateTrackDto
  ): Promise<TrackEntity> {
    return this.trackService.create(albumId, createTrackDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trackService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.trackService.findAll();
  }

}

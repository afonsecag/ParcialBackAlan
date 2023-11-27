import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}


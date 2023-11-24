import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from '../track/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  async create(albumData: Partial<AlbumEntity>): Promise<AlbumEntity> {
    // Validación de que el nombre y la descripción no estén vacíos
    if (!albumData.name || !albumData.description) {
      throw new BadRequestException('El nombre y la descripción no pueden estar vacíos.');
    }

    const album = this.albumRepository.create(albumData);
    return this.albumRepository.save(album);
  }

  async findOne(id: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id } });
    if (!album) {
      throw new NotFoundException(`El álbum con el ID ${id} no fue encontrado.`);
    }
    return album;
  }

  async findAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.find({ relations: ['tracks', 'performers'] });
  }

  async delete(id: string): Promise<void> {
    // Verificar si el álbum tiene tracks asociados
    const album = await this.albumRepository.findOne({ where: { id }, relations: ['tracks'] });

    if (!album) {
      throw new NotFoundException(`El álbum con el ID ${id} no fue encontrado.`);
    }

    if (album.tracks && album.tracks.length > 0) {
      throw new BadRequestException('No se puede eliminar un álbum que tiene tracks asociados.');
    }

    await this.albumRepository.remove(album);
  }
}

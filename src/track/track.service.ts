import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>
  ) {}

  async create(albumId: string, trackData: Omit<TrackEntity, 'id' | 'album'>): Promise<TrackEntity> {
    // Validar que la duración del track sea un número positivo
    if (trackData.duration <= 0) {
      throw new BadRequestException('La duración del track debe ser un número positivo.');
    }

    // Verificar si el álbum existe
    const album = await this.albumRepository.findOne({ where: { id: albumId } });
    if (!album) {
      throw new NotFoundException(`El álbum con el ID ${albumId} no fue encontrado.`);
    }

    const track = this.trackRepository.create({
      ...trackData,
      album
    });

    return this.trackRepository.save(track);
  }

  async findOne(id: string): Promise<TrackEntity> {
    const track = await this.trackRepository.findOne({ where: { id } });
    if (!track) {
      throw new NotFoundException(`El track con el ID ${id} no fue encontrado.`);
    }
    return track;
  }

  async findAll(): Promise<TrackEntity[]> {
    return this.trackRepository.find( { relations: ['album'] });
  }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';

@Injectable()
export class AlbumPerformerService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(PerformerEntity)
    private performerRepository: Repository<PerformerEntity>
  ) {}

  async addPerformerToAlbum(albumId: string, performerId: string): Promise<AlbumEntity> {
    const album = await this.albumRepository.findOne({ where: { id: albumId }, relations: ['performers'] });
    if (!album) {
      throw new NotFoundException(`El álbum con el ID ${albumId} no fue encontrado.`);
    }

    if (album.performers && album.performers.length >= 3) {
      throw new BadRequestException('Un álbum no puede tener más de tres performers asociados.');
    }

    const performer = await this.performerRepository.findOne({ where: { id: performerId } });
    if (!performer) {
      throw new NotFoundException(`El performer con el ID ${performerId} no fue encontrado.`);
    }

    // Verificar si el performer ya está asociado al álbum
    if (album.performers.some(p => p.id === performerId)) {
      throw new BadRequestException('Este performer ya está asociado al álbum.');
    }

    album.performers.push(performer);
    return this.albumRepository.save(album);
  }
}

import { Controller, Post, Param, NotFoundException } from '@nestjs/common';
import { AlbumPerformerService } from './album-performer.service';
import { AlbumEntity } from 'src/album/album.entity';

@Controller('album-performer')
export class AlbumPerformerController {
  constructor(private readonly albumPerformerService: AlbumPerformerService) {}

  @Post('add-performer/:albumId/:performerId')
  async addPerformerToAlbum(
    @Param('albumId') albumId: string,
    @Param('performerId') performerId: string
  ): Promise<AlbumEntity> {  
    return this.albumPerformerService.addPerformerToAlbum(albumId, performerId);
  }

  
}

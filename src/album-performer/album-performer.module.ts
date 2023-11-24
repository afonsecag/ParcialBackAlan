import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumPerformerService } from './album-performer.service';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, PerformerEntity]),
  ],
  providers: [AlbumPerformerService],
  exports: [AlbumPerformerService]
})
export class AlbumPerformerModule {}

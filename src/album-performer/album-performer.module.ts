import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumPerformerService } from './album-performer.service';
import { AlbumEntity } from '../album/album.entity';
import { PerformerEntity } from '../performer/performer.entity';
import { AlbumPerformerController } from './album-performer.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, PerformerEntity]),
  ],
  controllers: [AlbumPerformerController],
  providers: [AlbumPerformerService],
  exports: [AlbumPerformerService]
})
export class AlbumPerformerModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module'; 
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';
import { TrackController } from './track.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    AlbumModule
  ],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}

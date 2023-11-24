import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumModule } from '../album/album.module'; 
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity]),
    AlbumModule
  ],
  providers: [TrackService],
})
export class TrackModule {}

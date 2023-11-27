import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';
import { AlbumEntity } from '../album/album.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TrackService', () => {
    let service: TrackService;
    let repository: Repository<TrackEntity>;
    let albumRepository: Repository<AlbumEntity>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [TrackService],
      }).compile();
  
      service = module.get<TrackService>(TrackService);
      repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
      albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should create a track successfully', async () => {
      const albumId = 'some-album-id';
      const trackData = { name: 'New Track', duration: 200 };
  
      const album = new AlbumEntity();
      album.id = albumId;
  
      jest.spyOn(albumRepository, 'findOne').mockResolvedValue(album);
      jest.spyOn(repository, 'create').mockReturnValue({ ...trackData, album } as TrackEntity);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...trackData, album } as TrackEntity);
  
      const result = await service.create(albumId, trackData);
      expect(result).toEqual({ ...trackData, album });
    });
  
    it('should throw an error when trying to create a track with negative duration', async () => {
      const albumId = 'some-album-id';
      const trackData = { name: 'New Track', duration: -200 };
  
      jest.spyOn(albumRepository, 'findOne').mockResolvedValue(new AlbumEntity());
      await expect(service.create(albumId, trackData)).rejects.toThrow(BadRequestException);
    });
  
    it('should find a track by id', async () => {
      const trackId = 'some-track-id';
      const track = new TrackEntity();
      track.id = trackId;
  
      jest.spyOn(repository, 'findOne').mockResolvedValue(track);
      const result = await service.findOne(trackId);
      expect(result).toEqual(track);
    });
  
    it('should throw an error if track not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne('non-existing-id')).rejects.toThrow(NotFoundException);
    });
  
    it('should find all tracks', async () => {
      const trackList = [new TrackEntity(), new TrackEntity()];
      jest.spyOn(repository, 'find').mockResolvedValue(trackList);
      const result = await service.findAll();
      expect(result).toEqual(trackList);
    });
  });
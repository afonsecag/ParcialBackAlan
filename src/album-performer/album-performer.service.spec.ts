import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from '../performer/performer.entity';
import { PerformerService } from '../performer/performer.service';
import { AlbumEntity } from '../album/album.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AlbumPerformerService } from './album-performer.service';

describe('PerformerService', () => {
  let service: AlbumPerformerService;
  let performerRepository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumPerformerService],
    }).compile();

    service = module.get<AlbumPerformerService>(AlbumPerformerService);
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should successfully add a performer to an album', async () => {
    const mockAlbumId = '1';
    const mockPerformerId = '2';
    const mockAlbum = { id: mockAlbumId, performers: [] } as AlbumEntity;
    const mockPerformer = { id: mockPerformerId } as PerformerEntity;
  
    jest.spyOn(albumRepository, 'findOne').mockResolvedValue(mockAlbum);
    jest.spyOn(performerRepository, 'findOne').mockResolvedValue(mockPerformer);
    jest.spyOn(albumRepository, 'save').mockResolvedValue({
      ...mockAlbum,
      performers: [mockPerformer],
    });
  
    const result = await service.addPerformerToAlbum(mockAlbumId, mockPerformerId);
    expect(result.performers.length).toBe(1);
    expect(result.performers[0].id).toBe(mockPerformerId);
  });

  it('should throw an error if the album does not exist', async () => {
    const mockAlbumId = '1';
    const mockPerformerId = '2';
  
    jest.spyOn(albumRepository, 'findOne').mockResolvedValue(null);
  
    await expect(service.addPerformerToAlbum(mockAlbumId, mockPerformerId))
      .rejects
      .toThrow(new NotFoundException(`El álbum con el ID ${mockAlbumId} no fue encontrado.`));
  });
  


  });
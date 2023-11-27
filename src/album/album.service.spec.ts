import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TrackEntity } from '../track/track.entity';

describe('AlbumService', () => {
    let service: AlbumService;
    let repository: Repository<AlbumEntity>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [...TypeOrmTestingConfig()],
        providers: [AlbumService],
      }).compile();
  
      service = module.get<AlbumService>(AlbumService);
      repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    // Caso de prueba (i): Creación exitosa de un álbum
    it('should create an album successfully', async () => {
      const albumData: Partial<AlbumEntity> = {
        name: 'New Album',
        description: 'This is a new album',
        cover: 'new_album_cover.jpg',
        releaseDate: new Date(),
      };
  
      jest.spyOn(repository, 'save').mockImplementationOnce(() => Promise.resolve(albumData as AlbumEntity));
  
      const result = await service.create(albumData as AlbumEntity);
      expect(result).toEqual(albumData);
    });
  
    // Caso de prueba (ii): Intento de creación de un álbum con descripción vacía
    it('should throw an error when trying to create an album with an empty description', async () => {
      const albumData: Partial<AlbumEntity> = {
        name: 'New Album',
        description: '',
        cover: 'new_album_cover.jpg',
        releaseDate: new Date(),
      };
  
      jest.spyOn(repository, 'save').mockImplementationOnce(() => Promise.resolve(albumData as AlbumEntity));
  
      await expect(service.create(albumData as AlbumEntity)).rejects.toThrow();
    });

    // Caso positivo para findOne
  it('should find an album by id', async () => {
    const albumData: AlbumEntity = {
      id: '1',
      name: 'Album',
      cover: 'album_cover.jpg',
      releaseDate: new Date(),
      description: 'Album description',
      tracks: [],
      performers: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(albumData);

    const result = await service.findOne('1');
    expect(result).toEqual(albumData);
  });

  // Caso negativo para findOne
  it('should throw an error if no album is found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);
    await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  // Caso positivo para findAll
  it('should find all albums', async () => {
    const albumList: AlbumEntity[] = [
      {
        id: '1',
        name: 'Album 1',
        cover: 'cover1.jpg',
        releaseDate: new Date(),
        description: 'Description 1',
        tracks: [],
        performers: [],
      },
      {
        id: '2',
        name: 'Album 2',
        cover: 'cover2.jpg',
        releaseDate: new Date(),
        description: 'Description 2',
        tracks: [],
        performers: [],
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(albumList);

    const result = await service.findAll();
    expect(result).toEqual(albumList);
  });

  // Caso positivo para delete
  it('should delete an album', async () => {
    const albumData: AlbumEntity = {
      id: '1',
      name: 'Album',
      cover: 'album_cover.jpg',
      releaseDate: new Date(),
      description: 'Album description',
      tracks: [],
      performers: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(albumData);
    jest.spyOn(repository, 'remove').mockResolvedValue(albumData);

    await service.delete('1');
    expect(repository.remove).toHaveBeenCalledWith(albumData);
  });

  // Caso negativo para delete
  it('should throw an error if trying to delete an album with tracks', async () => {
    const albumData: AlbumEntity = {
      id: '1',
      name: 'Album',
      cover: 'album_cover.jpg',
      releaseDate: new Date(),
      description: 'Album description',
      tracks: [new TrackEntity()],
      performers: [],
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(albumData);

    await expect(service.delete('1')).rejects.toThrow(BadRequestException);
  });
  });
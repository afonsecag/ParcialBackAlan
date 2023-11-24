import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';

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
  });
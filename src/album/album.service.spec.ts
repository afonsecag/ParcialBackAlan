import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity';
import { TrackEntity } from '../track/track.entity'; 

describe('AlbumService', () => {
  let service: AlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let trackRepository: Repository<TrackEntity>; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: getRepositoryToken(AlbumEntity),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(TrackEntity),
          useValue: {

          },
        },

      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    trackRepository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity)); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Caso de prueba (i): Creación exitosa de un álbum
  it('should create an album successfully', async () => {
    const albumData = {
      name: 'Test Album',
      description: 'A great album',
      cover: 'cover.jpg',
      releaseDate: new Date(),
    };
    jest.spyOn(albumRepository, 'create').mockImplementation(() => albumData as AlbumEntity);
    jest.spyOn(albumRepository, 'save').mockResolvedValue(albumData as AlbumEntity);

    await expect(service.create(albumData as any)).resolves.toEqual(albumData);
  });

  // Caso de prueba (ii): Intento de creación de un álbum con descripción vacía
  it('should throw an error when creating an album with an empty description', async () => {
    const albumData = {
      name: 'Test Album',
      description: '',
      cover: 'cover.jpg',
      releaseDate: new Date(),
    };
    
    jest.spyOn(albumRepository, 'create').mockImplementation(() => albumData as AlbumEntity);
    jest.spyOn(albumRepository, 'save').mockResolvedValue(albumData as AlbumEntity);

    await expect(service.create(albumData as any)).rejects.toThrow();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { AlbumEntity } from '../album/album.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Caso positivo para create
  it('should create a performer successfully', async () => {
    const performerData = {
        name: 'New Performer',
        image: 'image.jpg',
        description: 'A great performer',
        albums: [], // Añadido para cumplir con la estructura de PerformerEntity
      } as PerformerEntity;
    jest.spyOn(repository, 'save').mockResolvedValue(performerData);

    const result = await service.create(performerData);
    expect(result).toEqual(performerData);
  });

  // Caso negativo para create
  it('should throw an error when description is too long', async () => {
    const performerData = {
      name: 'New Performer',
      image: 'image.jpg',
      description: 'A'.repeat(101), 
      albums: [], 
    } as PerformerEntity;
  
    await expect(service.create(performerData)).rejects.toThrow(BadRequestException);
  });

  // Caso positivo para findOne
  it('should find a performer by id', async () => {
    const performerData = {
        name: 'New Performer',
        image: 'image.jpg',
        description: 'A great performer',
        albums: [], // Añadido para cumplir con la estructura de PerformerEntity
      } as PerformerEntity;
    jest.spyOn(repository, 'findOne').mockResolvedValue(performerData);

    const result = await service.findOne('1');
    expect(result).toEqual(performerData);
  });

  // Caso negativo para findOne
  it('should throw an error if no performer is found', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);
    await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  // Caso positivo para findAll
  it('should find all performers', async () => {
    const performers: PerformerEntity[] = [
      {
        id: '1',
        name: 'Performer 1',
        image: 'image1.jpg',
        description: 'Description 1',
        albums: [], // Añade esta propiedad
      },
      {
        id: '2',
        name: 'Performer 2',
        image: 'image2.jpg',
        description: 'Description 2',
        albums: [], // Añade esta propiedad
      },
    ] as PerformerEntity[]; // Aserción de tipo para tratar el arreglo como PerformerEntity[]

    jest.spyOn(repository, 'find').mockResolvedValue(performers);

    const result = await service.findAll();
    expect(result).toEqual(performers);
  });
});

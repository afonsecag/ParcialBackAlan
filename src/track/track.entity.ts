import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { v4 as uuidv4 } from 'uuid';
  import { AlbumEntity } from '../album/album.entity';
  
  @Entity('tracks')
  export class TrackEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 500 })
    name: string;
  
    @Column('float')
    duration: number;
  
    @ManyToOne(() => AlbumEntity, album => album.tracks, {
      onDelete: 'CASCADE' // Asegúrate de manejar la eliminación de acuerdo a tus necesidades
    })
    album: AlbumEntity;
  
    constructor() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
  }
  
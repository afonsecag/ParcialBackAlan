import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
  } from 'typeorm';
  import { v4 as uuidv4 } from 'uuid';
  import { AlbumEntity } from '../album/album.entity';
  
  @Entity('performers')
  export class PerformerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ length: 500 })
    name: string;
  
    @Column()
    image: string;
  
    @Column('text')
    description: string;
  
    @ManyToMany(() => AlbumEntity, album => album.performers)
    @JoinTable({
      name: 'album_performers', 
      joinColumn: {
        name: 'performer_id',
        referencedColumnName: 'id'
      },
      inverseJoinColumn: {
        name: 'album_id',
        referencedColumnName: 'id'
      }
    })
    albums: AlbumEntity[];
  
    constructor() {
      if (!this.id) {
        this.id = uuidv4();
      }
    }
  }
  
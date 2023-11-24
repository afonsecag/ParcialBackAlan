import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { TrackEntity } from '../track/track.entity';
import { PerformerEntity } from '../performer/performer.entity';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column()
  cover: string;

  @Column()
  releaseDate: Date;

  @Column('text')
  description: string;

  @OneToMany(() => TrackEntity, track => track.album)
  tracks: TrackEntity[];

  @ManyToMany(() => PerformerEntity, performer => performer.albums)
  @JoinTable()
  performers: PerformerEntity[];

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
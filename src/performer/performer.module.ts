import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';
import { PerformerController } from './performer.controller';
@Module({
  imports: [TypeOrmModule.forFeature([PerformerEntity])],
  providers: [PerformerService],
  controllers: [PerformerController],
  exports: [TypeOrmModule, PerformerService]
})
export class PerformerModule {}

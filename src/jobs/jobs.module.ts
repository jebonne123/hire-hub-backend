import { Module } from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job, JobSchema } from './schemas/jobs.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema, collection: 'jobs' }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}

import { PartialType } from '@nestjs/mapped-types';
import { CreateJobDto } from './create-jobs.dto';

export class UpdateJobDto extends PartialType(CreateJobDto) {}
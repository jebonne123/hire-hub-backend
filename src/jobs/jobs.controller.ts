import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './schemas/dto/create-jobs.dto';
import { UpdateJobDto } from './schemas/dto/update-jobs.dto';
import { Job } from './schemas/jobs.schema';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    findAll(): Promise<Job[]> {
        return this.jobsService.findAll();
      }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(id);
    }
    
    @Post()
    create(@Body() createJobDto: CreateJobDto): Promise<Job> {
        return this.jobsService.create(createJobDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<Job> {
        return this.jobsService.update(id, updateJobDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.jobsService.remove(id);
    }
}

import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './schemas/dto/create-jobs.dto';
import { UpdateJobDto } from './schemas/dto/update-jobs.dto';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Post()
    create(@Body() createJobDto: CreateJobDto) {
        return this.jobsService.create(createJobDto);
    }

    @Get()
    findAll() {
        return this.jobsService.findAll();
      }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
        return this.jobsService.update(id, updateJobDto);
    }
}

import { Controller, Get, Post, Body, Param, Patch, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './schemas/dto/create-jobs.dto';
import { UpdateJobDto } from './schemas/dto/update-jobs.dto';
import { Job } from './schemas/jobs.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('jobs')
export class JobsController {
    constructor(private readonly jobsService: JobsService) {}

    @Get()
    @UseGuards(AuthGuard())
    findAll(@Query() query: any): Promise<Job[]> {
        console.log(query)
        return this.jobsService.findAll(query);
      }

    @Get(':id')
    @UseGuards(AuthGuard())
    findOne(@Param('id') id: string) {
        return this.jobsService.findOne(id);
    }
    
    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createJobDto: CreateJobDto, @Req() req): Promise<Job> {
        console.log(req.user);
        return this.jobsService.create(createJobDto, req.user);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto): Promise<Job> {
        return this.jobsService.update(id, updateJobDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    remove(@Param('id') id: string): Promise<void> {
        return this.jobsService.remove(id);
    }
}

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Job, JobDocument } from './schemas/jobs.schema';
import { CreateJobDto } from './schemas/dto/create-jobs.dto';
import { UpdateJobDto } from './schemas/dto/update-jobs.dto';


@Injectable()
export class JobsService {
    constructor(@InjectModel(Job.name) private jobModel: Model<JobDocument>) {}

    async findAll(): Promise<Job[]> {
        const jobs = await this.jobModel.find().exec();
        return jobs;
    }

    async findOne(id: string): Promise<Job>{
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid Job ID format');
          }
      
        const job = await this.jobModel.findById(id).exec();
        if(!job) throw new NotFoundException(`Job with this ID ${id} not found`);
        return job;
    }
    
    async create(createJobDto: CreateJobDto): Promise<Job> {
        console.log("Received CreateJobDto:", createJobDto);
        const newJob = await this.jobModel.create(createJobDto);
        return newJob.save();
    }

    async remove(id: string): Promise<void>{
        await this.jobModel.findByIdAndDelete(id);
    }

    async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
        const updatedPost = await this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
        if (!updatedPost) throw new NotFoundException('Post not found for update func');
        return updatedPost;
      }
}

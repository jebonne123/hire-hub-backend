import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type JobDocument = HydratedDocument<Job>;

@Schema()
export class Job {
    @Prop({ required: true })
    title:  string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    salary: string;

    @Prop({ type: Object, required: true })
    company: {
        name: string;
        description: string;
        contactEmail: string;
        contactPhone: string;
    };
}

export const JobSchema = SchemaFactory.createForClass(Job);
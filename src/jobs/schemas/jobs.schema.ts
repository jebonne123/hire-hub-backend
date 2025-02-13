import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/schemas/user.schema";

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true})
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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const JobSchema = SchemaFactory.createForClass(Job);
import { IsEmail, IsNotEmpty, IsString, ValidateNested, IsObject, IsEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/schemas/user.schema';


export class CompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEmail()
    contactEmail: string;

    @IsString()
    @IsNotEmpty()
    contactPhone: string;
}


export class CreateJobDto{
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsNotEmpty()
    @IsString()
    salary: string;

    @IsNotEmpty()
    @ValidateNested()
    @IsObject()
    @Type(() => CompanyDto) 
    company: CompanyDto;

    // from job schema 
    @IsEmpty({ message: "You cannot pass user id"})
    readonly user: User
}


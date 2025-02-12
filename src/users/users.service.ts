import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
    export class UsersService{
        private readonly users = [
            {
                userId: 1,
                username: 'beboy',
                password: 'beboy123'
            },
            {
                userId: 2,
                username: 'jebonne',
                password: 'jebonne123'
            }
        ];

        async findOne(username: string): Promise<User | undefined>{
            return this.users.find(user => user.username === username);
        }

    }

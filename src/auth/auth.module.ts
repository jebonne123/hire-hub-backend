import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      // To access process.env
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: config.get<string | number>('JWT_EXPIRES_IN')
          },
        };
      },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema, collection: 'User' }],)
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  // Passes this exported modules to other modules
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}

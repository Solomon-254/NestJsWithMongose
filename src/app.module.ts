import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/test'),
   UsersModule,
   UserProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

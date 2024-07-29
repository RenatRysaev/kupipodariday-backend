import { APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User as UserEntity } from './users/entities/user.entity';
import { WishesModule } from './wishes/wishes.module';
import { Wish as WishEntity } from './wishes/entities/wish.entity';
import { WishlistsModule } from './wishlists/wishlists.module';
import { Wishlist as WishlistEntity } from './wishlists/entities/wishlist.entity';
import { OffersModule } from './offers/offers.module';
import { Offer as OfferEntity } from './offers/entities/offer.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [UserEntity, WishEntity, WishlistEntity, OfferEntity],
      synchronize: true,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}

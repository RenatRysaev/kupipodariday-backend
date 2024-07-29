import { Entity, Column, OneToMany } from 'typeorm';
import { Length, IsEmail, IsUrl } from 'class-validator';
import { Exclude } from 'class-transformer';

import { Shared } from '../../shared';
import { Wish } from '../../wishes/entities/wish.entity';
import { Offer } from '../../offers/entities/offer.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';

@Entity()
export class User extends Shared.BaseColumns {
  @Column()
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  @OneToMany(() => Wish, (wish) => wish.owner)
  offers: Offer[];

  @OneToMany(() => Wishlist, (wishlist) => wishlist.id)
  wishlists: Wishlist[];
}

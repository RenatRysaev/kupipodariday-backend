import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsUrl, IsDecimal } from 'class-validator';

import { Shared } from '../../shared';
import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

@Entity()
export class Wish extends Shared.BaseColumns {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsDecimal({ decimal_digits: '2' })
  price: number;

  @Column()
  @IsDecimal({ decimal_digits: '2' })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  @Column()
  copied: number;
}

import { Entity, Column, ManyToOne } from 'typeorm';
import { IsDecimal } from 'class-validator';

import { Shared } from '../../shared';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Offer extends Shared.BaseColumns {
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column()
  @IsDecimal({ decimal_digits: '2' })
  amount: number;

  @Column({ default: false })
  hidden: boolean;
}

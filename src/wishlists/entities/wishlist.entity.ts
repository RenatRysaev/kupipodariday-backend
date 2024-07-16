import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Length, IsUrl } from 'class-validator';

import { Shared } from '../../shared';
import { User } from '../../users/entities/user.entity';
import { Wish } from '../../wishes/entities/wish.entity';

@Entity()
export class Wishlist extends Shared.BaseColumns {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @OneToMany(() => Wish, (wish) => wish.id)
  items: Wish[];

  @ManyToOne(() => User, (user) => user.wishlists)
  creator: User;
}

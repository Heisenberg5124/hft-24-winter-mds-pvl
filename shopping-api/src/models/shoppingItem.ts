import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class ShoppingItem {
  @PrimaryColumn()
  name!: string;

  @Column()
  amount!: number;
}
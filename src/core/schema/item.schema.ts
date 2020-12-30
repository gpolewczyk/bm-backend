import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  parent: string;

  @Prop()
  label: string;

  @Prop()
  url: string;

  @Prop({ select: false })
  __v: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

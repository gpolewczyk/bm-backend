import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item, ItemDocument } from 'src/core/schema/item.schema';
import {
  CreateItemDto,
  DeleteItemDto,
  UpdateItemDto,
} from 'src/core/dto/item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async update(updateItemDto: UpdateItemDto): Promise<Item> {
    const { id } = updateItemDto;
    return await this.itemModel.findOneAndUpdate({ _id: id }, updateItemDto);
  }

  async delete(deleteItemDto: DeleteItemDto): Promise<Item> {
    const { id } = deleteItemDto;
    return await this.itemModel.findOneAndDelete({ _id: id });
  }
}

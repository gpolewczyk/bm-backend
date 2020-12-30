import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  UsePipes,
  Param,
} from '@nestjs/common';
import { ItemsService } from 'src/modules/items/items.service';
import { Item } from 'src/core/schema/item.schema';
import {
  CreateItemDto,
  DeleteItemDto,
  UpdateItemDto,
} from 'src/core/dto/item.dto';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { ValidationPipe } from 'src/core/pipe/custom-validation.pipe';

@Controller('items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Get()
  async findAll(): Promise<Item[]> {
    return await this.itemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    return await this.itemsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemsService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put()
  async update(@Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return await this.itemsService.update(updateItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Delete()
  async delete(@Body() deleteItemDo: DeleteItemDto): Promise<Item> {
    return await this.itemsService.delete(deleteItemDo);
  }
}

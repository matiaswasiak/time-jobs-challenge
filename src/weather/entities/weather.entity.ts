import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  temperature: number;

  @Prop({
    unique: true,
    index: true,
  })
  city: string;

  @Prop({
    unique: true,
    index: true,
  })
  searchDate: Date;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Weather extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  city: string;

  temperature: number;
}

export const WeatherSchema = SchemaFactory.createForClass(Weather);

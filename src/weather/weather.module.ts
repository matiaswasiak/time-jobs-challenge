import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { Weather, WeatherSchema } from './entities/weather.entity';

@Module({
  controllers: [WeatherController],
  providers: [WeatherService],
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
})
export class WeatherModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { Weather, WeatherSchema } from './entities/weather.entity';
import { OpenWeatherApiService } from 'src/open-weather-api/open-weather-api.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }]),
  ],
  controllers: [WeatherController],
  providers: [WeatherService, OpenWeatherApiService, AxiosAdapter],
})
export class WeatherModule {}

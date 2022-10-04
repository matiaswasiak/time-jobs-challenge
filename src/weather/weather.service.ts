import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    const { city, temperature } = createWeatherDto;
    return await this.weatherModel.create({
      city,
      temperature,
    });
  }

  async findByCity(city: string): Promise<Weather> {
    return await this.weatherModel.findOne({ city });
  }

  async update(temperature: number, city: string) {
    return await this.weatherModel.updateOne({ city }, { temperature, city });
  }
}

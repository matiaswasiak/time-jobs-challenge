/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    createWeatherDto.city = createWeatherDto.city.toLowerCase();

    try {
      const weather = await this.weatherModel.create(createWeatherDto);
      return weather;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(
          `This city already exists in DB ${JSON.stringify(error.keyValue)}`,
        );
      }

      console.log(error);
      throw new InternalServerErrorException(
        `Can't create City - Check server logs`,
      );
    }
  }

  async getCityByName(term: string): Promise<any> {
    let city;

    if (!city && isValidObjectId(term)) {
      city = await this.weatherModel.findById(term);
    }

    if (!city) {
      city = await this.weatherModel.findOne({
        city: term.toLowerCase().trim(),
      });
    }

    if (!city)
      throw new NotFoundException(`The city or ID "${term}" was not found`);

    return city;
  }

  async update(temperature: number, city: string) {
    return await this.weatherModel.updateOne({ city }, { temperature, city });
  }
}

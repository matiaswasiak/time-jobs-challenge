/* eslint-disable prettier/prettier */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { OpenWeatherApiService } from 'src/open-weather-api/open-weather-api.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { Weather } from './entities/weather.entity';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather.name)
    private readonly weatherModel: Model<Weather>,
    private readonly openWeatherApiService: OpenWeatherApiService,
  ) {}

  async create(createWeatherDto: CreateWeatherDto): Promise<Weather> {
    createWeatherDto.city = createWeatherDto.city.toLowerCase();

    try {
      const weather = await this.weatherModel.create(createWeatherDto);
      return weather;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async getWeather(term: string) {
    let result = await this.getWeatherDb(term);

    if (result === null) {
      result = this.getWeatherApi(term);
      return result;
    }

    return result;
  }

  async getWeatherApi(term: string): Promise<any> {
    const result = await this.openWeatherApiService.getWeather(term);
    console.log(result.name, result.main.temp);
    return await this.create({
      city: result.name,
      temperature: result.main.temp,
    });
  }

  async getWeatherDb(term: string): Promise<any> {
    let city;

    if (!city && isValidObjectId(term)) {
      city = await this.weatherModel.findById(term);
    }

    if (!city) {
      city = await this.weatherModel.findOne({
        city: term.toLowerCase().trim(),
      });
    }

    return city;
  }

  async update(term: string, updateWeatherDto: UpdateWeatherDto) {
    const city = await this.getWeatherDb(term);

    if (updateWeatherDto.city)
      updateWeatherDto.city = updateWeatherDto.city.toLowerCase();

    try {
      await city.updateOne(updateWeatherDto);
      return { ...city.toJSON(), ...updateWeatherDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.weatherModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`ID "${id}" was not found `);

    return;
  }

  private handleExceptions(error: any) {
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

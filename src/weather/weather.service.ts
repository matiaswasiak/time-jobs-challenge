import { Injectable } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';

@Injectable()
export class WeatherService {
  create(createWeatherDto: CreateWeatherDto) {
    createWeatherDto.city = createWeatherDto.city.toLowerCase();
    return createWeatherDto;
  }

  findAll() {
    return `This action returns all weather`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`;
  }

  update(id: number, updateWeatherDto: UpdateWeatherDto) {
    return `This action updates a #${id} weather`;
  }

  remove(id: number) {
    return `This action removes a #${id} weather`;
  }
}

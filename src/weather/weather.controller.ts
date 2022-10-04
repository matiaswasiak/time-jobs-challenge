import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.weatherService.getCityBy(term);
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updateWeatherDto: UpdateWeatherDto,
  ) {
    return this.weatherService.update(term, updateWeatherDto);
  }
}

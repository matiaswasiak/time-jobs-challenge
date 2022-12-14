import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { WeatherResponse } from './interfaces/weather-response.interface';

@Injectable()
export class OpenWeatherApiService {
  constructor(private readonly http: AxiosAdapter) {}

  async getWeather(city: string) {
    const data = await this.http.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`,
    );

    return data;
  }
}

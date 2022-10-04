/* eslint-disable prettier/prettier */
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    let attempts = 1;
    let weatherCity;

    while (attempts <= 3 && !weatherCity) {
      try {
        if (Math.random() > 0.15) {
          weatherCity = await this.axios.get<T>(url);
        } else {
          throw new Error();
        }
      } catch (error) {
        attempts++;
        console.log(attempts);
      }
    }

    if (!weatherCity) {
      throw new HttpException(
        'An Error ocurred while trying to connect with an OpenWeather api. Try it again',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    return weatherCity.data;
  }
}

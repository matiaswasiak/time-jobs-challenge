import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherApiService } from './open-weather-api.service';

describe('OpenWeatherApiService', () => {
  let service: OpenWeatherApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenWeatherApiService],
    }).compile();

    service = module.get<OpenWeatherApiService>(OpenWeatherApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

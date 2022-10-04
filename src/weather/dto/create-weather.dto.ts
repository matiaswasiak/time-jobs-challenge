import { IsInt, IsString, MinLength } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  @MinLength(1)
  city: string;

  @IsInt()
  temperature: number;

  attempts: number;
}

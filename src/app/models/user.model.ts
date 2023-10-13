import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

@Exclude()
export class User {
  @Expose()
  @IsString()
  public readonly id: string = crypto.randomUUID();

  @Expose()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @Expose()
  @IsString()
  @Length(5, 10)
  @IsNotEmpty()
  public password: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public creationDate: Date;
}
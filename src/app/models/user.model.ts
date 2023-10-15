import { Exclude, Expose, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

import { CryptoProvider } from 'app/providers';
import { DateHelper } from 'app/helpers';

@Exclude()
export class AddUserBody {
  @Expose()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @Expose()
  @IsString()
  @Length(5, 10)
  @IsNotEmpty()
  public password: string;
}

@Exclude()
export class User extends AddUserBody  {
  @Expose()
  @IsString()
  public readonly id: string = CryptoProvider.generateRandomId();

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public readonly creationDate: Date = new Date();
}

export class UserAuth {
  public token: string;

  public readonly expires: number = DateHelper.addDaysToCurrentInMs(10); // add 10 days
}
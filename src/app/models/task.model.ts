import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { User } from './user.model';

export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
}

@Exclude()
export class Task {
  @Expose()
  @IsString()
  public readonly id: string = crypto.randomUUID();

  @Expose()
  @IsString()
  @IsNotEmpty()
  public title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public creationDate: Date;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  public dueDate: Date;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public assignedTo: User;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public category: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public status: TaskStatus;
}
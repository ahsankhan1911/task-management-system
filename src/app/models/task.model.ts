import { Exclude, Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional, IsEnum } from 'class-validator';

import { CryptoProvider } from 'app/providers';

export enum TaskStatus {
  Pending = 'pending',
  Completed = 'completed',
}

export interface TaskQuery { assignedTo?: string, category?: string; page?: number; limit?: number; }

@Exclude()
export class AddTaskBody {
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
  public dueDate: Date;

  @Expose()
  @IsString()
  @IsOptional()
  public assignedTo?: string; // User.id

  @Expose()
  @IsString()
  @IsNotEmpty()
  public category: string;

  @Expose()
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  public status: TaskStatus;
}

@Exclude()
export class Task extends AddTaskBody {
  @Expose()
  @IsString()
  public readonly id: string = CryptoProvider.generateRandomId();

  @Expose()
  @Type(() => Date)
  @IsNotEmpty()
  public readonly creationDate: Date = new Date();
}
import { IsArray, IsString } from 'class-validator';

export class CreateFolderDto {
  @IsString()
  name: string;

  @IsArray()
  vaults: string[];
}

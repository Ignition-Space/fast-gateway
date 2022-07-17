import { PartialType } from '@nestjs/swagger';
import { CreatePageConfigDto } from './create-page-config.dto';

export class UpdatePageConfigDto extends PartialType(CreatePageConfigDto) {}

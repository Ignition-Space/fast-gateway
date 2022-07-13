import { SetMetadata } from '@nestjs/common';

export const IS_STREAM_KEY = 'isStream';

export const IsStream = () => SetMetadata(IS_STREAM_KEY, true);

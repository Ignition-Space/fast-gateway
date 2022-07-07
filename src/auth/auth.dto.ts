import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'lumin' })
  username: string;
  @ApiProperty({ example: 'Bufangqi129' })
  password: string;
}

export class GitlabToken {
  access_token: string;
}

export class GetTokenByApplications {
  @ApiProperty({ example: 'iPzSxfuXv81JAU7EXr3bog' })
  code: string;
}

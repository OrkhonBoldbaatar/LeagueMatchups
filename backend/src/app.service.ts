import { Injectable } from '@nestjs/common';
import {IS_SHARED_WORKING} from '@league-matchups/shared';

@Injectable()
export class AppService {
  getHello(): string {
    return IS_SHARED_WORKING;
  }
}

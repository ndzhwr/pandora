import {
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { GENDER } from '@prisma/client';
import { GENDER as STRING_GENDER } from 'src/types';
@Injectable()
export class ParseGenderPipe implements PipeTransform {
  transform(value: any) {
    const received_gender: STRING_GENDER = value.gender;
    if (!received_gender) {
      return value;
    } else {
      let gender: GENDER = GENDER.MALE;
      switch (received_gender) {
        case 'FEMALE':
          gender = GENDER.FEMALE;
          break;
        case 'MALE':
          gender = GENDER.MALE;
          break;
        case 'PREFER_NOT_TO_SAY':
          gender = GENDER.PREFER_NOT_TO_SAY;
          break;
        default:
          throw new NotAcceptableException('Invalid gender value');
      }
      value.gender = gender;
      return value;
    }
  }
}

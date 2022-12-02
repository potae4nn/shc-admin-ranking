import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(data: string): unknown {
    let sex;
    switch (data) {
      case '1':
        sex = 'ชาย'
        break;
      case '2':
        sex = 'หญิง'
        break;
      default:
        break;
    }
    return sex;
  }

}

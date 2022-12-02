import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setTime'
})
export class SetTimePipe implements PipeTransform {

  transform(time: any): any {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;
    let minutesNew;
    if (
      minutes == 1 ||
      minutes == 2 ||
      minutes == 3 ||
      minutes == 4 ||
      minutes == 5 ||
      minutes == 6 ||
      minutes == 7 ||
      minutes == 8 ||
      minutes == 9
    ) {
      minutesNew = 0 + minutes.toString();
    } else {
      minutesNew = minutes;
    }
    return hours + '.' + minutesNew;
  }

}

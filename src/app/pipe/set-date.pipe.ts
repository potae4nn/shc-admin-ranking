import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'setDate'
})
export class SetDatePipe implements PipeTransform {

  transform(date: any): any {
    const d = new Date(date);
    const months = [
      'ม.ค.',
      'ก.พ.',
      'มี.ค.',
      'เม.ย.',
      'พ.ค.',
      'มิ.ย.',
      'ก.ค.',
      'ส.ค.',
      'ก.ย.',
      'ต.ค.',
      'พ.ย.',
      'ธ.ค.',
    ];
    const days = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const dates = d.getDate();
    const year = d.getFullYear() + 543;

    return day + ' ' + dates + ' ' + month + ' ' + year;
  }

}

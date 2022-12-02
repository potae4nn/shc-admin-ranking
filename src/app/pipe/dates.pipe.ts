import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {
  transform(data: any): any {
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
    let d = new Date(data*1000);
    // console.log(d.getHours()+':'+d.getMinutes());
    const day = days[d.getDay()];
    const month = months[d.getMonth()];
    const date = d.getDate();
    const year = d.getFullYear() + 543;

    const minutes = d.getMinutes();
    let conMinuts;
    if(minutes<10){
      conMinuts = '0'+minutes;
    }else{
      conMinuts = minutes;
    }
    let dateThai ='วัน '+ day +' '+date+' '+month+' '+year+' เวลา '+d.getHours()+':'+conMinuts+' น.';
    return dateThai;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(status : any): any {
    if(status == 1){
      return "อนุมัติแล้ว"
    } else if(status == 2){
      return "ไม่อนุมัติ"
    }
    return "รออนุมัติ";
  }

}

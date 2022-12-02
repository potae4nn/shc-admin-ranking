import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusActivity'
})
export class StatusActivityPipe implements PipeTransform {

  transform(status: any): any {
    if (status == 1) {
      return 'Active';
    } else if (status == 0) {
      return 'Inactive';
    }
  }
}

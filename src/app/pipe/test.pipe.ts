import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(data:any): unknown {
    console.log(data);
    return null;
  }

}

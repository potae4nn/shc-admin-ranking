import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageGroup'
})
export class ImageGroupPipe implements PipeTransform {

  transform(data:any): unknown {
    const words = data.split(',');
    return words;
  }

}

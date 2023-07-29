import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {
    transform(array: Array<any>): Array<Object> {
      array.sort((a: any, b: any) => {
        if (a.dateCreated < b.dateCreated) {
          return -1;
        } else if (a.dateCreated > b.dateCreated) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }
  }

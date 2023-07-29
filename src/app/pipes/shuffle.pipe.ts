import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shuffle'
})
export class ShufflePipe implements PipeTransform {

  transform(value: Array<Object>): Array<Object> {
    if (!value) { return []; }
    return value.sort(this.randomize);
  }

  private randomize(a, b) {
    return Math.random() > .5 ? -1 : 1;
  }
}

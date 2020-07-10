import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitChars'
})

export class LimitCharsPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return value.substr(0, limit);
  }

}

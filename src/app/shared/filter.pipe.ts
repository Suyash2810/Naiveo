import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: Array<any>, key: string, value: string): Array<any> {

    let filteredList = list.filter(item => item[key] == value);
    return filteredList;
  }

}

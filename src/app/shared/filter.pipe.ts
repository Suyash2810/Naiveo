import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(list: Array<any>, key: string, value: string): Array<any> {
    if (value == "") {
      return list;
    }

    let filteredList = list.filter((item) => {
      let name = (item[key]).toLowerCase();
      return name.indexOf(value) > -1;
    });

    return filteredList;
  }

}

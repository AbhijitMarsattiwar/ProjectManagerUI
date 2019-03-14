import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchTerm: any, searchProps?: string[]): any {
    if (!items) return [];
    if (!searchTerm) return items;
    return items.filter(item => {
      for (let key in item) {
        if (!searchProps) {
          if (("" + item[key]).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            return true;
          }
        }
        else if(searchProps && searchProps.indexOf(key) > -1) {
          if (("" + item[key]).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
  }

}

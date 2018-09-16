import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filterList"
})
export class FilterListPipe implements PipeTransform {
  transform(list: any[], args?: any): any {
    return list.filter(
      item => item.title.toLowerCase().indexOf(args.toLowerCase()) !== -1
    );
  }
}

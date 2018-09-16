import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "truncateText" })
export class TruncateTextPipe implements PipeTransform {
  transform(item, filter = 25) {
    if (item.length >= filter) {
      return item.substring(0, filter) + "...";
    }
    return item;
  }
}

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "getInitials",
  standalone: true
})
export class GetInitialsPipe implements PipeTransform {
  transform(fullName: string): string {
    console.log(fullName);
    const words = fullName.trim().split(" ").slice(0, 2);

    let initials = "";

    for (const word of words) {
      if (word) {
        initials += word[0].toUpperCase();
      }
    }

    return initials.slice(0, 2);
  }
}

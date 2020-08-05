import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'byPassSecurity'
})
export class ByPassSecurityPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform (value: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(value);
  }
  

}

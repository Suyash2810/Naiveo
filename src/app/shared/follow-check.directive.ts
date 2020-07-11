import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[appFollowCheck]'
})
export class FollowCheckDirective {

  constructor(private tempRef: TemplateRef<any>, private viewContRef: ViewContainerRef, private authService: AuthService) { }

  @Input() set appFollowCheck(list: Array<any>) {
    const id = this.authService.getUserId();
    if (list.indexOf(id) > -1) {
      this.viewContRef.clear();
    } else {
      this.viewContRef.createEmbeddedView(this.tempRef);
    }
  }
}

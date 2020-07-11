import { NgModule } from "@angular/core";
import { FilterPipe } from './filter.pipe';
import { LimitCharsPipe } from './limit-chars.pipe';
import { FollowCheckDirective } from './follow-check.directive';

@NgModule({
    declarations: [
        FilterPipe,
        LimitCharsPipe,
        FollowCheckDirective
    ],
    exports: [
        FilterPipe,
        LimitCharsPipe,
        FollowCheckDirective
    ]
})

export class SharedModule {

}
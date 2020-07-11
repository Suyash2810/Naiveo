import { NgModule } from "@angular/core";
import { FilterPipe } from './filter.pipe';
import { LimitCharsPipe } from './limit-chars.pipe';
import { FollowCheckDirective } from './follow-check.directive';
import { UnfollowCheckDirective } from './unfollow-check.directive';

@NgModule({
    declarations: [
        FilterPipe,
        LimitCharsPipe,
        FollowCheckDirective,
        UnfollowCheckDirective
    ],
    exports: [
        FilterPipe,
        LimitCharsPipe,
        FollowCheckDirective,
        UnfollowCheckDirective
    ]
})

export class SharedModule {

}
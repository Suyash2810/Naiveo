import { NgModule } from "@angular/core";
import { FilterPipe } from './filter.pipe';
import { LimitCharsPipe } from './limit-chars.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        LimitCharsPipe
    ],
    exports: [
        FilterPipe,
        LimitCharsPipe
    ]
})

export class SharedModule {

}
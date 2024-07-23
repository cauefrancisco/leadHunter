import { NgModule } from "@angular/core";
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
    imports:[
        ChartModule,
        DropdownModule
    ],
    exports: [
        ChartModule,
        DropdownModule
    ]
})

export class PrimeNgModule {}
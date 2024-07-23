import { NgModule } from "@angular/core";
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
    imports:[
        ChartModule,
        DropdownModule,
        InputTextModule
    ],
    exports: [
        ChartModule,
        DropdownModule,
        InputTextModule
    ]
})

export class PrimeNgModule {}
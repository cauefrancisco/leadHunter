import { style } from '@angular/animations';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../shared/modules/material.module';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<PaymentComponent>);
  public data = inject<any>(MAT_DIALOG_DATA);

  @ViewChild('paypalRef', {static: true}) paypalRef!: ElementRef;

  public amount!: string;
  public isPaid = false;


  constructor(){}

  ngOnInit(): void {
    this.amount = this.data?.price;
    window.paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.data.title,
                amount: {
                  currency_code: 'BRL',
                  value: this.data?.price,
                }
              }
            ]
          })
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log(details);
            this.isPaid = true;
          })
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paypalRef.nativeElement)
  }
}

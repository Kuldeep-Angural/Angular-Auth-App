import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { products } from '../../constants/productConstant';
import { ProductCardComponent } from "../../templates/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productview',
  standalone: true,
  imports: [MatCardModule,ProductCardComponent,CommonModule],
  templateUrl: './productview-component.html',
  styleUrl: './onboarding.component.css'
})
export class ProductView {

  products = products;
  filteredProducts:any = {}
  constructor(private route: ActivatedRoute) {}



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      const filteredData = this.products.filter((p)=>p.id===id)
      console.log(filteredData);
      this.filteredProducts=filteredData[0];
    });
  }

  
}

import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { products } from '../../constants/productConstant';
import { ProductCardComponent } from "../../templates/product-card/product-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [MatCardModule,ProductCardComponent,CommonModule],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.css'
})
export class OnboardingComponent {

  products = products;
  

  
}

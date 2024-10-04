import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

interface Product {
  id:string,
  title: string;
  subtitle: string;
  imageSrc: string;
  content: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [MatCardModule]
})
export class ProductCardComponent {
  router = inject(Router);
  @Input() product!: Product; // Use the Product interface for type safety
  naviGate(id:string){
    this.router.navigate([`/productView`, id])
    
  }
}

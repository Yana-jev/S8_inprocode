import { Component } from '@angular/core';
import { Product } from '../../interfaces/iproduct';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";



@Component({
  selector: 'lista',
  standalone: true,
  imports: [CommonModule, RouterLink, ProgressBarComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  productos: Product[] = [];
  loading: boolean = false;


  constructor(private _productService: ProductService){

  }
  ngOnInit(): void {
    this.getListProducts()
    
  }

  getListProducts(){
    this.loading = true;
      this._productService.getListProduct().subscribe((data: Product[])=>{
        this.productos = data;
        this.loading = false
    })  
    }

    deleteProduct(id:number){
      this.loading = true
      this._productService.deleteProduct(id).subscribe(()=>{
        this.getListProducts();
        
      })
    }

  }


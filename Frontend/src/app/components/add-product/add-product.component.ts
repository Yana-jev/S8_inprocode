import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../interfaces/iproduct';
import { ProductService } from '../../services/product.service';



@Component({
  selector: 'add-product',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar';

  constructor(private fb: FormBuilder,
              private _productService: ProductService,
              private router: Router,
              private aRoute: ActivatedRoute,
            ){
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })
    this.id = Number( aRoute.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = 'Editar ';
      this.getProduct(this.id);
      this.loading = false;
      
    }
  }

getProduct(id:number){
  this.loading = true;
  this._productService.getProduct(id).subscribe((data: Product)=>{
    console.log(data)
    this.form.setValue({
      name: data.name,
      description: data.description ,
      price: data.price,
      stock: data.stock ,
    })
  })
  
}

  addProduct(){
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock

    }
    this.loading = true;
    if(this.id !==0){
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(()=>{
        console.log('el producto fue actualizado')
        this.loading = false;
        this.router.navigate(['/']);
        
      })


    } else {

      this._productService.saveProduct(product).subscribe(() => {
        console.log('el producto fue registrado')
        this.loading = false;
        this.router.navigate(['/']);
      })
  }
}

}

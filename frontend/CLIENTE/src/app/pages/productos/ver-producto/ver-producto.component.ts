import { Router, ActivatedRoute, Params } from '@angular/router';
import { Producto } from './../../../interfaces/producto';
import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as globals from './../../../global-variables'

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styles: []
})
export class VerProductoComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private ProductsService: ProductsService) {}

  producto
  id;
  imgSrc
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id); // Print the parameter to the console. 
    });
  

    this.ProductsService.getProducto(this.id)
    .subscribe((res: Producto[]) => {
      //console.log(res);
      this.producto = res;
      console.log(this.producto[0].NOMBRE)
      this.imgSrc = globals.SERVER + '/'+ this.producto[0].IMAGEN
      console.log(this.imgSrc)
    })
    
  }

}

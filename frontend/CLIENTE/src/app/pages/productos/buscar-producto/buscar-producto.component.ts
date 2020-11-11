import { Router } from '@angular/router';
import { Producto } from './../../../interfaces/producto';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Categoria } from './../../../interfaces/categoria';
import * as globals from '../../../global-variables';

@Component({
  selector: 'app-buscar-producto',
  templateUrl: './buscar-producto.component.html',
  styles: []
})
export class BuscarProductoComponent implements OnInit {
  server = globals.SERVER + "/"
  categoria
  productos
  selectedCat
  constructor(private ProductsService: ProductsService, private HttpClient: HttpClient, private router: Router) { }

  redirect(id){
    const link = '/ver-producto'
        this.router.navigate([link,{id: id}])
    console.log("redir")
  }

  productoCat(){
    this.ProductsService.getProductoCat(this.selectedCat)
    .subscribe((res:Producto[]) =>{
      this.productos = res
    })
  }

  async buscarPro(form){
    this.ProductsService.getBuscarPro(form.value.producto)
    .subscribe((res:Producto[]) =>{
      this.productos = res
      console.log(this.productos)
    })
  }
  ordenar(modo){
    if(modo == "Asc"){
      this.productos.sort(function (a, b) {
        if (a.PRECIO > b.PRECIO) {
          return 1;
        }
        if (a.PRECIO < b.PRECIO) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    }
    else{
      this.productos.sort(function (a, b) {
        if (a.PRECIO > b.PRECIO) {
          return -1;
        }
        if (a.PRECIO < b.PRECIO) {
          return 1;
        }
        // a must be equal to b
        return 0;
      });
    }
  }

  ngOnInit(): void {
    this.ProductsService.getProductos()
    .subscribe((res:Producto[]) =>{
      this.productos = res
      console.log(this.productos)
    })
    this.ProductsService.getCategoria()
    .subscribe((res: Categoria[]) => {
      this.categoria=res;
    })
  }

}

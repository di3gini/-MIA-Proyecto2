import { AdminService } from './../../../services/admin.service';
import { Router } from '@angular/router';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styles: []
})
export class CrearCategoriaComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router){ }

  crearCat(form): void{
    console.log(form.value)
    this.adminService.crearCat(form.value).subscribe(res => {
      console.log('Login', form.value)
    });
  }
  ngOnInit(): void {
  }

}

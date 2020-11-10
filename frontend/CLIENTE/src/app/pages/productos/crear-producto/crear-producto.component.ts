import { HttpClient } from '@angular/common/http';
import { Categoria } from './../../../interfaces/categoria';
import { categoria } from './../../../../../../../backend/src/models/categoria.model';
import { ProductsService } from './../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import * as globals from '../../../global-variables';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styles: []
})
export class CrearProductoComponent implements OnInit {
  isCollapsed = true;
  constructor(private ProductsService: ProductsService, private HttpClient: HttpClient) {}

  imgURL: any = "assets/img/default-product.jpg";
  public message: string;
  uploadedFiles: Array < File > ;
  categoria
  public imagePath;


  addImage(element){
    
    this.uploadedFiles = element.target.files; // outputs the first file
    console.log(element.target.files)
    if (element.length === 0)
      return;
 
    var mimeType = element.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      alert( this.message);
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = element.target.files;
    reader.readAsDataURL(element.target.files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      console.log(this.imgURL)
    }


 
  }

  async crearProducto(form){
  
    if(!form.valid){
      alert("Llené todos los campos antes de cargar un producto");
    }else{
      let formData = new FormData();
      for (var i = 0; i < this.uploadedFiles.length; i++) {
        formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }

    var asyncRes = await this.HttpClient.post(globals.SERVER+'/api/products/upload', formData).toPromise()

  
    let enviar: Object = {
      nombre: form.value.nombre,
      descripcion: form.value.descripcion,
      claves: form.value.clave,
      precio: form.value.precio,
      categoria: form.value.selectedCategoria,
      correo: localStorage.getItem("USER_EMAIL"),
      usuario: localStorage.getItem("USER_ID"),
      imagen: asyncRes['msg']
    }

    await this.ProductsService.subir(enviar)
    .subscribe(res => {
      if(res){
        alert("Producto Creado Correctamente");
        form.reset();
        this.imgURL = "assets/img/default-product.jpg"
      }
    })
    //form.reset();
    
    console.log(enviar)
    }
  }

  ngOnInit() {

    this.ProductsService.getCategoria()
    .subscribe((res: Categoria[]) => {
      console.log(res);
      this.categoria=res;
   
    })
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("landing-page");

    var canvas: any = document.getElementById("chartBig");
    var ctx = canvas.getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 350, 0, 50);
    gradientFill.addColorStop(0, "rgba(228, 76, 196, 0.0)");
    gradientFill.addColorStop(1, "rgba(228, 76, 196, 0.14)");
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("landing-page");
  }
}

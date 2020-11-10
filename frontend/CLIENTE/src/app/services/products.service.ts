import { JwtResponse } from './../interfaces/jwt-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { User } from '../interfaces/user';
import { tap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject, from} from 'rxjs'; 
import * as globals from '../global-variables';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  AUTH_SERVER: string = globals.SERVER;
  authSubject = new BehaviorSubject(false);
  private token: string;
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  })

  constructor(private httpClient: HttpClient) { }

  subir(producto): Observable<any> {
    return this.httpClient.post( this.AUTH_SERVER +'/api/products/crearProducto',
      producto,{headers: this.headers}).pipe(tap(res => res ))
  }

  getProducto(id){
    return this.httpClient.get( this.AUTH_SERVER +'/api/products/getProducto?id='+id,
    {
      headers: this.headers
    }).pipe(map(data=>data))
   }
  
  getCategoria(){
   return this.httpClient.get( this.AUTH_SERVER +'/api/products/getCategoria',
   {
     headers: this.headers
   }).pipe(map(data=>data))
  }
}

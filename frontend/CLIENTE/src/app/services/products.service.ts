import { JwtResponse } from './../interfaces/jwt-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from} from 'rxjs'; 
import * as globals from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  AUTH_SERVER: string = globals.SERVER;
  authSubject = new BehaviorSubject(false);
  private token: string;
  loggedin: boolean = false;
  constructor(private httpClient: HttpClient) { }

  subir(user: User): Observable<any> {
    return this.httpClient.post( this.AUTH_SERVER +'/api/auth/register',
      user).pipe(tap(
        (res: any) => {
          if (res){
            console.log("Registrado")
            //guardar token
            //this.saveToken(res.dataUser.accesToken, res.dataUser.expiresIn);
          }
        }
      ))
  }
}

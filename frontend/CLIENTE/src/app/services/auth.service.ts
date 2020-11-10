import { JwtResponse } from './../interfaces/jwt-response';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../interfaces/user';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, from} from 'rxjs'; 
import * as globals from '../global-variables';

@Injectable()
export class AuthService {

  AUTH_SERVER: string = globals.SERVER;
  authSubject = new BehaviorSubject(false);
  private token: string;
  loggedin: boolean = false;
  constructor(private httpClient: HttpClient) { }

  register(user: User): Observable<any> {
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


  login(user: User): Observable<JwtResponse> {
    return this.httpClient.post<JwtResponse>( this.AUTH_SERVER +'/api/auth/login',
      user).pipe(tap(
        (res: JwtResponse) => {
          if (res){
            //guardar token
            this.saveToken(res.token, res.expires, res.user, res.id);
            console.log(res)
          }
        }
      ));
  }


  async verifyLogin(): Promise<boolean>{
    const token = this.getToken()
    let estado = false
    if(token != null || token!= undefined)
    await this.httpClient.get<any>
    ( this.AUTH_SERVER +'/api/auth/verifyToken?token='+token,{observe : 'response'}).toPromise().then(
      res => {
        console.log(res)
        if (res.status == 200 ){
          console.log("Res " + res.status)
          console.log("Estado 200");
          this.loggedin = true;
          estado = true;
          //console.log(estado)
        } else{
          console.log("Estado 401");
          this.loggedin = false;
          estado = false;
        }
      }
    )
    {
      return new Promise<boolean>((res, rej) => {

        res(estado)
      })

    }
    
    //return null
  }

  logout(){
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN")
    localStorage.removeItem("EXPIRES_IN")
    localStorage.removeItem("USER_EMAIL")
    localStorage.removeItem("USER_ID")
    console.log("Logged out")
    
  }

  private saveToken(token: string, expiresIn: string, mail: string, id_usuario: number): void{
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("USER_EMAIL", mail);
    localStorage.setItem("USER_ID", id_usuario.toString())
    this.token = token
  }

  private getToken(): string{
    if(!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponse } from '../models/jwt-response';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { Observable,BehaviorSubject } from 'rxjs';


@Injectable()
export class AuthService {
  AUTH_SERVER:string = 'https://localhost:7201/api';
  authSubject = new BehaviorSubject(false);
  private tokenCode:string = "";
  constructor(private httpClient:HttpClient) { }

  loginAsesor(user: User): Observable<JwtResponse> {
    console.log(user);
    return this.httpClient.post<JwtResponse>(`${this.AUTH_SERVER}/Asesor`, { Usuario:user.Usuario,Pwd:user.Pwd}
      ).pipe(tap(
        (res: JwtResponse) => {
          if (res) {
            console.log(res);
            if(res.status){
              // guardar token
              this.saveToken(res.token, "5",res.codigoAsesor,res.nombreAsesor);
            }
          }
        })
      );
  }

  isAuthenticated()  {
    const promise = new Promise(
      (resolve, reject) => {
          resolve(this.getToken());
      }
    );
    return promise;
  }


  private getToken(): boolean {
    if (localStorage.getItem("ACCESS_TOKEN")){
      return true;
    }else{
      return false;
    }
  }
  
  logout(): void {
    this.tokenCode = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    localStorage.removeItem("COD_USER");
    localStorage.removeItem("NAME_USER");
  } 

  private saveToken(token: string, expiresIn: string,codigoAsesor:number,nombreAsesor:string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    localStorage.setItem("COD_USER",codigoAsesor.toString());
    localStorage.setItem("NAME_USER",nombreAsesor);
    this.tokenCode = token;
  }

  
}

import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiurl=environment.apiurl;
  readonly defaultImage='https://robohash.org';
  
 
  constructor(private http : HttpClient) { }

  
  //kullanıcıların tümünü getiren fonksiyon.
  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiurl}/usersss`)
    .pipe(
    catchError(this.handleError)
    );
  }
 
  //kayıtlı ilk kullaıcıyı döndüren fonksiyon
  getUser() : Observable<User>{
    return this.http.get<User>(`${this.apiurl}/users/1`)
    .pipe(
      map(user=>{
        return{...user ,searcKey:[user.name,user.username]}
      })
    );
  }
  //kullanıcı oluşturup post eden fonksiyon
  createUser(user:User) : Observable<User>{
    return this.http.post<User>(`${this.apiurl}/users`,user);
  }
  //kullanıcıyı güncelleyen, düzenleyen fonksiyon
  updateUser(user:User) : Observable<User>{
    return this.http.put<User>(`${this.apiurl}/users/${user.id}`,user);
  }
  patchUser(user:User) : Observable<User>{
    return this.http.patch<User>(`${this.apiurl}/users/${user.id}`,user);
  }
  //kullanıcıyı silen fonksiyon
  deleteUser(id:number) : Observable<unknown>{
    return this.http.delete<unknown>(`${this.apiurl}/users/${id}`);
  }
  //yüklü dosyaları post eden fonksiyon
  uploadFiles(formData:FormData) : Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`http://localhost:4200/file/upload`,formData,{observe:'events',reportProgress:true});
  }
  downloadFile():Observable<HttpResponse<Blob>> {
    return this.http.get(`assets/text.txt`,{responseType:`blob`,observe:`response`});
  }
  //text dosyasında ki içeriğii getiren fonsiyon
  getTextFile():Observable<string> {
    return this.http.get(`assets/text.txt`,{responseType:`text`});
  }
  private handleError(error:HttpErrorResponse):Observable<never>{
     return throwError({code: 404 , message: 'Page Not Found or File Not Found'});
  }
  /*
    //kullanıcıların tümünü getiren fonksiyon.
  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(`${this.apiurl}/users`)
    .pipe(
      map(users =>users.map(user=>({
        email:user.email,
        website:user.website,
        phone:user.phone,
        image:`${this.defaultImage}/${user.username.toLowerCase()}`,
        username:user.username,
        name:user.name.toUpperCase(),
        isAdmin:user.id===10? 'admin':'user',
        searchKey:[user.name,user.username]
      })))
    );
  }
  */
}

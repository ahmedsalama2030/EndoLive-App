import { HttpClient, HttpParams } from '@angular/common/http';
 import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/Entities/Doctor';
import { PaginationResult } from '../models/hepler/Pagination ';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
    baseUrl=environment.apiUrl+'doctors/';
 constructor(private http:HttpClient) { }

  // get all doctors list from api
  get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterValue?:any,sortType?:any):Observable<PaginationResult<Doctor[]>>{
    const paginationResult:PaginationResult<Doctor[]>= new PaginationResult<Doctor[]>();
    let params=new HttpParams();
    if(pageNumber!=null &&itemsPerPage !=null ){
      params=params.append('pageNumber',pageNumber);
      params=params.append('pageSize',itemsPerPage);
      params=params.append('filterType',filterType ||'' );
    params=params.append('filterValue',filterValue||'' );
    params=params.append('sortType',sortType||'' );
       }
   
  
    return this.http.get<Doctor[]>(this.baseUrl, {observe:'response',params}).pipe(
      map(response=>{
        console.log(response);
        paginationResult.result=response.body || undefined ; 
        if(response.headers.get('Pagination')!=null){
          paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
       }
        return paginationResult;
      })
    );
    
    }
    getAllDoctors():Observable<Doctor[]>{
      return this.http.get<Doctor[]>(this.baseUrl+'getAllDoctors');
    }
    getById(id:any):Observable<Doctor>{
      return this.http.get<Doctor>(this.baseUrl+id);
    }
  getForReport(){
return this.http.get(this.baseUrl+'getForReport');
  }
  register(model:any):Observable<Doctor>{
return   this.http.post<Doctor>(this.baseUrl+'register',model);
  }
  edit(id:any,model:any):Observable<Doctor>{
    return this.http.put<Doctor>(this.baseUrl+id,model)

  }
  deleteRange(model:any){
    return   this.http.post(this.baseUrl+'deleterange',model)
  }
  delete(id:string)
  {
    return this.http.delete(this.baseUrl+id)
  }

}

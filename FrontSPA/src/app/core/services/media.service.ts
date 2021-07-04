import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Media } from '../models/Entities/Media';
import { PaginationResult } from '../models/hepler/Pagination ';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  baseUrl=environment.apiUrl+'colonoscopyReport/';
  constructor(private http:HttpClient) { }
 
   // get all doctors list from api
   get(pageNumber?:any,itemsPerPage?:any,filterType?:any,filterValue?:any,sortType?:any):Observable<PaginationResult<Media[]>>{
     const paginationResult:PaginationResult<Media[]>= new PaginationResult<Media[]>();
     let params=new HttpParams();
     if(pageNumber!=null&&itemsPerPage !=null){
       params=params.append('pageNumber',pageNumber);
       params=params.append('pageSize',itemsPerPage);
       params=params.append('filterType',filterType||'');
       params=params.append('filterValue',filterValue||'');
         params=params.append('sortType',sortType||'');
 
     }
     return this.http.get<Media[]>(this.baseUrl, {observe:'response',params}).pipe(
       map(response=>{
         paginationResult.result=response.body || undefined ; 
         if(response.headers.get('Pagination')!=null){
           paginationResult.pagination=JSON.parse(response.headers.get('Pagination')||'');
        }
         return paginationResult;
       })
     );
     
     }
   
   register(model:any):Observable<Media>{
 return   this.http.post<Media>(this.baseUrl+'register',model);
   }
   edit(id:any,model:any):Observable<Media>{
     return this.http.put<Media>(this.baseUrl+id,model)
 
   }
   deleteRange(model:any){
     return   this.http.post(this.baseUrl+'deleterange',model)
   }
   delete(id:string)
   {
     return this.http.delete(this.baseUrl+id)
   }
 
 }
 

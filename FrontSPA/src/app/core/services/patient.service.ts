import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Patient } from '../models/Entities/Patient';
import { PaginationResult } from '../models/hepler/Pagination ';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = environment.apiUrl + 'patients/';
  constructor(private http: HttpClient) { }
  // get all patient list from api
  getAll(pageNumber?: any, itemsPerPage?: any, filterType?: any, filterValue?: any, sortType?: any): Observable<PaginationResult<Patient[]>> {
    const paginationResult: PaginationResult<Patient[]> = new PaginationResult<Patient[]>();
    let params = new HttpParams();
    if (pageNumber != null && itemsPerPage != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', itemsPerPage);
      params = params.append('filterType', filterType||'');
      params = params.append('filterValue', filterValue||'');
      params = params.append('sortType', sortType||'');

    }
    return this.http.get<Patient[]>(this.baseUrl, { observe: 'response', params }).pipe(
      map(response => {
        paginationResult.result = response.body || undefined;
        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination') || '');

        }
        return paginationResult;
      })
    );

  }
  // check lab code found  from api

  IsLabCodeFound(labcode: string): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + "checklabcode/" + labcode).pipe();
  }
  getById(id: any) {
    return this.http.get(this.baseUrl + id);
  }
  getByCode(code: any):Observable<Patient>{
    return this.http.get<Patient>(this.baseUrl+"getByLabCode/" + code);
  }
  register(model: any): Observable<Patient> {
    return this.http.post<Patient>(this.baseUrl + 'register', model);
  }
  delete(id: any) {
    return this.http.delete(this.baseUrl + id);
  }
  deleteRange(model: any) {
    return this.http.post(this.baseUrl + 'deleterange', model);
  }
  edit(id: any, model: any): Observable<Patient> {
    return this.http.put<Patient>(this.baseUrl + id, model);
  }

  uploadMedia(code:string,file:any){
    console.log(file)
    return this.http.post<Patient>(this.baseUrl+"uploadMedia/"+code,file,
    {reportProgress: true, observe: 'events'}
   );
  }
}
 
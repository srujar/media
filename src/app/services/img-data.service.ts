import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': '563492ad6f917000010000014060d806c66c47b88b9b4d7f8c487692'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ImgDataService {

  constructor(private http: HttpClient) { }
  getdata(search, perPage): Observable<any> {
    const url = "https://api.pexels.com/v1/search?query=" + search + "&per_page=" + perPage;
    return this.http.get<any>(url, httpOptions).pipe(catchError(this.handelError));
  }
  handelError(error) {
    return throwError(error.message || "Server Error");
  }
}

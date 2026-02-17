import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = '8db2a2bcac22425aa073ca5562b54d24'; 

  constructor(private http: HttpClient) { }

  getAgriNews(searchTerm?: string): Observable<any> {
    let query = '(agriculture OR farming OR crops OR agri-funding) AND (Australia)';

    if (searchTerm) {
      query = `(${query}) AND (${searchTerm})`;
    }

    // More accurate agriculture + Australia filtering
    const params = new HttpParams()
      .set('q', query)
      .set('searchIn', 'title,description') 
      .set('language', 'en')
      .set('sortBy', 'publishedAt')
      .set('pageSize', '20')
      .set('apiKey', this.apiKey);

    return this.http.get(this.apiUrl, { params });
  }
}

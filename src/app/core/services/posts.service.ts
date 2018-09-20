import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { IPost } from '../model/interfaces';

@Injectable()

export class PostsService {
  private headers;
  private setHeaders() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.headers.append('charset', 'UTF-8');
    this.headers.append('user', 'userid');
    var token = localStorage.getItem('token');
    if (token) {
      let tokenValue = 'Bearer ' + token;
      console.log("tokenValue:" + tokenValue);
      this.headers.append('Authorization', tokenValue);
    }
  }
  private myParams = new URLSearchParams()

  constructor(private http: Http, private httpClient: HttpClient) { }

  async getPosts(params, search, date) {
    try {
      this.setHeaders();
      let skipValue = (params - 1) * 10;
      this.myParams.set('\$skip', skipValue.toString());
      this.myParams.set('\$search', search);
      this.myParams.set('\$date', date);
      this.myParams.set('\_id', "");
      let options = new RequestOptions({ headers: this.headers, params: this.myParams });
      let response = await this.http.get('/api/post', options).toPromise();
      return response.json();

    } catch (error) {
      await (error);
    }
  }

  async addComment(id,comment){
    let url = 'api/post/' + id;
    this.setHeaders();
    let options = new RequestOptions({ headers: this.headers });
    try{
      let response = await this.http.patch(url,comment,options).toPromise();
      return response.json();
    }
    catch (error)
    {
      await (error);
    }
    
  }

  addPost(post): Observable<any> {
    this.setHeaders()
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post('/api/post', JSON.stringify(post), options);
  }
  /*  getPost(id){

      this.setHeaders();
      this.myParams.set('\_id', id.toString());
      let options = new RequestOptions({ headers: this.headers, params: this.myParams });
      return this.http.get('/api/post',options).toPromise();//.then(;
      //return response.json();



  } */


  getPost(id: string): Observable<any> {
    return this.httpClient.get<IPost>('api/post/' + id)
      .pipe(
        map(post => {
          return post;
        }),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Node.js server error');
  }


}

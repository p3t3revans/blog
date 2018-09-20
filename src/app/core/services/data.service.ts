import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IPost, ICustomer, IOrder, IState, IPagedResults, IApiResponse, IComment} from '../../shared/interfaces';

@Injectable()
export class DataService {
    postsBaseUrl = '/api/posts'
    customersBaseUrl = '/api/customers';
    ordersBaseUrl = '/api/orders';
    orders: IOrder[];
    states: IState[];

    constructor(private http: HttpClient) { }
    getPostsPage(page: number, pageSize: number):  Observable<IPagedResults<IPost[]>> {
        return this.http.get<IPost[]>(
            `${this.postsBaseUrl}/page/${page}/${pageSize}`,
            //'/api/posts',
            { observe: 'response' })
            .pipe(
                map(res => {
                    //const totalRecords = +res.headers.get('X-InlineCount');
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const posts = res.body as IPost[];
                    return {
                        results: posts,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            ); 

    } 
    getPost(id: string): Observable<IPost> {
        return this.http.get<IPost>(this.postsBaseUrl + '/' + id)
            .pipe(
                map(post => {
                    //this.calculateCustomersOrderTotal([post]);
                    return post;
                }),
                catchError(this.handleError)
            );
    }
    insertPost(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(this.postsBaseUrl + '/create', post)
            .pipe(catchError(this.handleError));
    }
    likePost(post:IPost): Observable<boolean> {
        return this.http.put<IApiResponse>(this.postsBaseUrl + '/like/' + post.id,post)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    likeComment(postId:string,commentId:string): Observable<boolean> {
        return this.http.put<IApiResponse>(`${this.postsBaseUrl}/like/${postId}/${commentId}`,{})
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    dislikePost(post:IPost): Observable<boolean> {
        return this.http.put<IApiResponse>(this.postsBaseUrl + '/dislike/' + post.id,post)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    dislikeComment(postId:string,commentId:string): Observable<boolean> {
        return this.http.put<IApiResponse>(`${this.postsBaseUrl}/dislike/${postId}/${commentId}`,{})
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    insertComment(post:IPost,comment:IComment): Observable<boolean> {
        return this.http.put<IApiResponse>(this.postsBaseUrl + '/comment/' + post.id, comment)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    updatePost(post: IPost): Observable<boolean> {
        return this.http.put<IApiResponse>(this.postsBaseUrl + '/' + post.id, post)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deletePost(id: string): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.postsBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }
    getCustomersPage(page: number, pageSize: number): Observable<IPagedResults<ICustomer[]>> {
        return this.http.get<ICustomer[]>(
            `${this.customersBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const customers = res.body as ICustomer[];
                    this.calculateCustomersOrderTotal(customers);
                    return {
                        results: customers,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }
    
    getCustomers(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.customersBaseUrl)
            .pipe(
                map(customers => {
                    this.calculateCustomersOrderTotal(customers);
                    return customers;
                }),
                catchError(this.handleError)
            );
    }

    getCustomer(id: number): Observable<ICustomer> {
        return this.http.get<ICustomer>(this.customersBaseUrl + '/' + id)
            .pipe(
                map(customer => {
                    this.calculateCustomersOrderTotal([customer]);
                    return customer;
                }),
                catchError(this.handleError)
            );
    }

    insertCustomer(customer: ICustomer): Observable<ICustomer> {
        return this.http.post<ICustomer>(this.customersBaseUrl, customer)
            .pipe(catchError(this.handleError));
    }

    updateCustomer(customer: ICustomer): Observable<boolean> {
        return this.http.put<IApiResponse>(this.customersBaseUrl + '/' + customer.id, customer)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteCustomer(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.customersBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    getStates(): Observable<IState[]> {
        return this.http.get<IState[]>('/api/states')
            .pipe(catchError(this.handleError));
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

    calculateCustomersOrderTotal(customers: ICustomer[]) {
        for (const customer of customers) {
            if (customer && customer.orders) {
                let total = 0;
                for (const order of customer.orders) {
                    total += order.itemCost;
                }
                customer.orderTotal = total;
            }
        }
    }

    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }

}

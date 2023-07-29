import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Article } from '../class/article';
import { catchError, tap } from 'rxjs/operators';
import { Comment } from '../class/comment';

@Injectable()
export class BlogService {
  httpOptions: Object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private messageService: MessageService, private http: HttpClient) { }

  private articlesUrl = 'http://localhost:3000/articles';  // URL to web api

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET heroes from the server */
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.articlesUrl)
      .pipe(
        catchError(this.handleError('getArticles', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getArticle(id: number): Observable<Article> {
    const url = `${this.articlesUrl}/${id}`;
    return this.http.get<Article>(url).pipe(
      catchError(this.handleError<Article>(`getArticle id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateArticle (article: Article): Observable<Article> {
    const url = `${this.articlesUrl}/${article.id}`;
    return this.http.put<Article>(url, article, this.httpOptions).pipe(
      tap(_ => this.log(`"${article.title}" updated !`)),
      catchError(this.handleError<any>('updateArticle'))
    );
  }

  /** POST: add an new article to the server */
  addArticle (article: Article): Observable<Article> {
    return this.http.post<Article>(this.articlesUrl, article, this.httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((article: Article) => this.log(`"${article.title}" added to articles !`)),
      catchError(this.handleError<Article>('addHero'))
    );
  }

  addComment (comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.articlesUrl, comment, this.httpOptions).pipe(
      // tslint:disable-next-line:no-shadowed-variable
      tap((comment: Comment) => this.log('Comment added !')),
      catchError(this.handleError<Comment>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteArticle (article: Article | number): Observable<Article> {
    const id = typeof article === 'number' ? article : article.id;
    const url = `${this.articlesUrl}/${id}`;
    return this.http.delete<Article>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Article deleted !`)),
      catchError(this.handleError<Article>('deleteArticles'))
    );
  }
}

import { Observable, of } from 'rxjs';

export default class Utils {
  static handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  static log(message: string) {
    //this.messageService.add(`HeroService: ${message}`);
    console.log(message);
  }
}

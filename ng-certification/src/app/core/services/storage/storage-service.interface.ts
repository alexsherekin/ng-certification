import {Observable} from 'rxjs';

export abstract class StorageServiceInterface<T> {
  public abstract get(): Observable<undefined | T>;
  public abstract add(value: T): Observable<void>;
  public abstract update(value: T): Observable<void>;
  public abstract remove(): Observable<void>;
}

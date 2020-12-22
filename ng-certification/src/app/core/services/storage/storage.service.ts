import {BehaviorSubject, EMPTY, merge, Observable, of} from 'rxjs';
import {StorageServiceInterface} from './storage-service.interface';

export class StorageService<T> implements StorageServiceInterface<T> {
  private readonly subject = new BehaviorSubject<undefined | T>(undefined);
  readonly value$ = merge(this.subject, this.get());

  constructor(private readonly key: string) {
  }

  get(): Observable<undefined | T> {
    try {
      const value = localStorage.getItem(this.key);
      return of(this.deserialize(value));
    } catch (error) {
      return of(undefined);
    }
  }

  add(value: T): Observable<void> {
    const serializedValue = this.serialize(value);
    localStorage.setItem(this.key, serializedValue);
    this.subject.next(value);
    return EMPTY;
  }

  update(value: T): Observable<void> {
    return this.add(value);
  }

  remove(): Observable<void> {
    localStorage.removeItem(this.key);
    this.subject.next(undefined);
    return EMPTY;
  }

  private serialize(value: T): string {
    return JSON.stringify(value);
  }

  private deserialize(value: string): T {
    return JSON.parse(value);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  getTasks() {
    let url = 'https://jsonplaceholder.typicode.com/users';
    return this.http.get(url);
  }
}

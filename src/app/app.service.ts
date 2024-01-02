import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}
  
  saveToLocalStorage(dbName: string, data: any): void {
    let db: any[] = [];
    const item = localStorage.getItem(dbName);
    
    if (item !== null) {
      db = JSON.parse(item);
    }
    
    db.push(data);
    localStorage.setItem(dbName, JSON.stringify(db));
  }
}

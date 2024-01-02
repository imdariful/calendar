import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

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
    data.id = uuidv4();
    db.push(data);
    localStorage.setItem(dbName, JSON.stringify(db));
  }

  getDataFromLocalStorage(dbName: string): any[] {
    const data = localStorage.getItem(dbName);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  }

  deleteDataFromLocalStorage(dbName: string, id: string): void {
    const data = localStorage.getItem(dbName);
    if (data) {
      const db = JSON.parse(data);
      const filtered = db.filter((item: any) => item.id !== id);
      localStorage.setItem(dbName, JSON.stringify(filtered));
    }
  }

  updateDataFromLocalStorage(dbName: string, id: string, data: any): void {
    const db = this.getDataFromLocalStorage(dbName);
    const filtered = db.filter((item: any) => item.id !== id);
    filtered.push(data);
    localStorage.setItem(dbName, JSON.stringify(filtered));
  }






}

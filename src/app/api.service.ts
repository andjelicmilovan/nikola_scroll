import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }

  fetchSpaces(){
    return this.httpClient.get("https://api.spacexdata.com/v3/launches")
  }
}

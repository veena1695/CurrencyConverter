import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

var BASE_URL = "https://api.exchangeratesapi.io/latest"
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {

  constructor(private http: HttpClient) { }

  getAllCurrencies(){
    return this.http.get(`https://openexchangerates.org/api/currencies.json`)
  }


  getExchangeRate(data:any){
    return this.http.get(`${BASE_URL}?base=${data.fromCurrency}&symbols=${data.toCurrency}`)
  }
}

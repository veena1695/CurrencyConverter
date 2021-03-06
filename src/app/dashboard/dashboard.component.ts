import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../services/common-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  selectedSource = ""
  selectedTarget = [];
  dummyArr = ["ABC","QPR"]
  sourceAmt : number = 1;
  allCurrencies :any = [];
  ratesArr :any = []
  currencyObj :any = {}

  constructor(private _commonService: CommonServiceService) { }


  ngOnInit(): void {
    let subscribeCurrency = this._commonService.getAllCurrencies();
    subscribeCurrency.subscribe((data:any)=>{
      this.currencyObj = data
      this._commonService.getAllCurrenciesAvailable().subscribe((res:any )=>{
        this.allCurrencies = Object.keys(res.rates).map((y,i)=>{
          return {"code": y , "country": data[y] }
        })
        console.log(this.allCurrencies)
      })
    });
  }

  onChangeSource(change:any){
    console.log(change)
    this.getExchange()
  }

  onChangeTarget(change:any){
    console.log(this.selectedTarget);
    this.getExchange()
  }

  getExchange(){
    this.ratesArr = []
    if(this.selectedSource!='' && this.selectedTarget.length > 0){
      this._commonService.getExchangeRate({fromCurrency: this.selectedSource, toCurrency: this.selectedTarget}).subscribe((data:any)=>{
        console.log(data)
        this.ratesArr = Object.keys(data.rates).map((x:any )=>{
          return { code: x, country: this.currencyObj[x] , rate: this.sourceAmt * data.rates[x]}
        })
      })
    }
  }

}

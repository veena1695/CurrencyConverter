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

  constructor(private _commonService: CommonServiceService) { }


  ngOnInit(): void {
    let subscribeCurrency = this._commonService.getAllCurrencies();
    subscribeCurrency.subscribe((data:object)=>{
      this.allCurrencies = Object.keys(data).map((y,i)=>{
        return {"code": y , "country": Object.values(data)[i] }
      })
      console.log(this.allCurrencies)
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
        this.ratesArr = Object.keys(data.rates).map((x)=>{
          return {country: x , rate: this.sourceAmt * data.rates[x]}
        })
      })
    }
  }

}

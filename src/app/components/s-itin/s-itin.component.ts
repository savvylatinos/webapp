import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { UserInterface } from 'src/app/models/user-interface';
import { QuoteInterface } from 'src/app/models/quote-interface';
import { UserWService } from 'src/app/services/user-w.service';
import { FormBuilder,FormGroup, Validators  } from '@angular/forms';
import { isError } from "util";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-s-itin',
  templateUrl: './s-itin.component.html',
  styleUrls: ['./s-itin.component.css']
})
export class SItinComponent implements OnInit {
  ngFormOne: FormGroup;
  ngFormTwo: FormGroup;
  public isError = false;
  public isError2 = false;
  
  text="¿Qué tipo de empresa eres?";
  steep=0;
  isLogged = false;
  submitted = false;
  submitted2 = false;
  userType=""
  public user : UserInterface ={
    email:"",
    userType:"",
    password:"",
    status:"",
  };
  public quote : QuoteInterface ={
    type:"",
    status:"",
    companyName:"",
    description:"",
    companyAddress:"",
    recipientAddress:"",
    associateAddress:"",
    associateName:"",
    liableName:"",
    liablePhone:"",
    liableEmail:"",
  };
  constructor(
    public router:Router,
    public toastr: ToastrService,
    public authService:AuthService,
    public _uw:UserWService,
    public dataApiService:DataApiService,
    private formBuilder: FormBuilder 

  ) { }
get fval() {
  return this.ngFormOne.controls;
  }
get fval2() {
  return this.ngFormTwo.controls;
  }

public checkOne(){
  this.submitted = true;
  if (this.ngFormOne.invalid) {
    this._uw.errorFormOne=true;
  return;
      } 
    this.next(0);
  }
  showSuccess() {
    this.toastr.success('Solicitud enviada con éxito!', 'OK' , {
      progressBar:true,
      progressAnimation:'increasing',

      timeOut: 5000
  })
             }
public checkTwo(){
    this.submitted2 = true;
    if (this.ngFormTwo.invalid) {
      this._uw.errorFormTwo=true;
    return;
        } 
      this.proccess();
    }

public  back(i:any){
   if(i>0 ){this.steep=i-1}
  }
  public updateCard(){
    this._uw.card.statusItin="proccess"; 
    this.dataApiService.updateCard(this._uw.card,this._uw.card.id).subscribe();
  }
public proccess (){
  this._uw.quote.name =this.ngFormOne.value.name;
  this._uw.quote.surName =this.ngFormOne.value.surName;
  this._uw.quote.email =this.ngFormOne.value.email;
  this._uw.quote.phone =this.ngFormOne.value.phone;
  this._uw.quote.localAddress =this.ngFormOne.value.localAddress;
  this._uw.quote.externalAddress =this.ngFormOne.value.externalAddress;
  
  this._uw.quote.country =this.ngFormTwo.value.country;
  this._uw.quote.city =this.ngFormTwo.value.city;
  this._uw.quote.gender =this.ngFormTwo.value.gender;
  this._uw.quote.passportNumber =this.ngFormTwo.value.passportNumber;
  this._uw.quote.countryExp =this.ngFormTwo.value.countryExp;
  this._uw.quote.expirateDate =this.ngFormTwo.value.expirateDate;
  this._uw.quote.lastTime =this.ngFormTwo.value.lastTime;
  this.dataApiService.saveQuote(this._uw.quote) .subscribe(
    quote => 
    {
    console.log("solicitud itin enviada")
    //this.waiting=false
    //this.successform=true
    this.showSuccess()
    //this.text=""
    this.updateCard();
    this.router.navigate(['/account'])
    }// this.router.navigate(['/successregister'])
);
}
onCheckUser(): void {
  if (this.authService.getCurrentUser() === null) {
    this.isLogged = false;
    this._uw.isLogged=false;
  } else {
    this.isLogged = true;
    this._uw.isLogged=true;
  }
}
public next(i:any){this.steep=i+1;console.log("steep "+this.steep);}
  ngOnInit() {
    this.ngFormOne = this.formBuilder.group({
      name: ['', [Validators.required]],
       surName: ['', [Validators.required]],
       email: ['', [Validators.required]],
       phone: ['', [Validators.required]],
       localAddress: ['', [Validators.required]],
       externalAddress: ['', [Validators.required]]
      });
    this.ngFormTwo = this.formBuilder.group({
      country: ['', [Validators.required]],
        city: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        passportNumber: ['', [Validators.required]],
        countryExp: ['', [Validators.required]],
        expirateDate: ['', [Validators.required]],
        lastTime: ['', [Validators.required]]
      });

    this.steep=0;
    this.onCheckUser();
    this.userType=this.authService.getCurrentUser().userType;
    console.log(""+this.userType);
  }

}

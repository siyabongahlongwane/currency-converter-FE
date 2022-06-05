import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiesDialogComponent } from '../cookies-dialog/cookies-dialog.component';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';
import { TermsComponent } from '../terms/terms.component';
import { CommonService } from '../services/common.service';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styles: [],
})
export class ClientHomeComponent implements OnInit {
  @ViewChild('conversionForm') conversionForm: NgForm | undefined;
  currentYear: Number = new Date().getFullYear();
  currOneValid: boolean = false;
  currTwoValid: boolean = false;
  spinner: boolean = false;
  skeleton: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  conversion: any = {
    date: new Date().toDateString().slice(0, 11),
    amount: null,
    conversionRate: 0,
    convertedAmount: 0,
    firstCurrencyName: null,
    secondCurrencyName: null,
    firstCurrency: null,
    secondCurrency: null,
    firstSymbol: null,
    secondSymbol: null,
  };
  showConversion: boolean = false;
  countries: any[] = [];
  filteredValues: any[] = [];
  filteredValuesTwo: any[] = [];
  swapped: boolean = false;
  showError: boolean = false;
  submitted: boolean = false;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    console.log(this.common.checkCookie());
    if (this.common.checkCookie() === null) {
      this.openCookiesDialog();
    }
  }

  getConversionRate(): any {
    this.submitted = true;
    if (!this.conversion.amount || !this.currOneValid || !this.currTwoValid) {
      this.showError = true;
      return false;
    }
    this.skeleton = true;
    this.getFirstCurrencyCode(this.conversionForm?.value.firstCurrencyName);
    this.getSecondCurrencyCode(this.conversionForm?.value.secondCurrencyName);
    this.conversion = Object.assign(
      this.conversion,
      this.conversionForm?.value
    );

    this.api
      .getCurrencies(`convertCurrency?q=${JSON.stringify(this.conversion)}`)
      .subscribe(
        (res: any) => {
          if (res) {
            this.conversion = res;
            this.showConversion = true;
            this.skeleton = false;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  getCountries() {
    this.spinner = true;
    this.api.getCountries('getCountries').subscribe(
      (res: any) => {
        if (res) {
          this.spinner = false;
          this.countries = res;
        }
      },
      (err) => {
          this.common.openSnackbar('Error fetching countries from server!');
      }
    );
  }

  filterValues(val: any) {
    return this.countries.filter(
      (country) =>
        country.currencyName.toLowerCase().includes(val.toLowerCase()) === true
    );
  }

  swapCurrencies(): any {
    let temp = {
      firstCurrency: this.conversionForm?.value.secondCurrency,
      firstCurrencyName: this.conversionForm?.value.secondCurrencyName,
      secondCurrency: this.conversionForm?.value.firstCurrency,
      secondCurrencyName: this.conversionForm?.value.firstCurrencyName,
      firstSymbol: this.conversion.secondSymbol || '',
      secondSymbol: this.conversion.firstSymbol || '',
    };
    this.conversion.firstCurrency = temp.firstCurrency;
    this.conversion.firstCurrencyName = temp.firstCurrencyName;
    this.conversion.secondCurrency = temp.secondCurrency;
    this.conversion.secondCurrencyName = temp.secondCurrencyName;
    this.conversionForm?.setValue({
      amount: this.conversionForm?.value.amount,
      firstCurrencyName: this.conversion.firstCurrencyName,
      secondCurrencyName: this.conversion.secondCurrencyName,
    });
    this.getConversionRate();
  }

  getCurrency(val: any, currName: string) {
    if (currName === 'secondCurrencyName') {
      this.filteredValuesTwo = this.filterValues(val);
    } else {
      this.filteredValues = this.filterValues(val);
    }
  }

  getFirstCurrencyCode(val: any) {
    this.countries.forEach((curr: any) => {
      if (curr.currencyName == this.conversionForm!.value.firstCurrencyName) {
        this.conversionForm!.value.firstCurrency = curr.id;
        this.conversion.firstSymbol = curr.currencySymbol || '';
        this.conversionForm!.value.firstCurrencyName = curr.currencyName;
        return;
      }
    });
  }

  getSecondCurrencyCode(val: any) {
    this.countries.forEach((curr: any) => {
      if (curr.currencyName === this.conversionForm!.value.secondCurrencyName) {
        this.conversionForm!.value.secondCurrency = curr.id;
        this.conversion.secondSymbol = curr.currencySymbol || '';
        this.conversionForm!.value.secondCurrencyName = curr.currencyName;
        return;
      }
    });
  }

  checkIfCurrencyOneIsValid(x: any): any {
    console.log(x.target.value);
    this.countries.forEach((country: any) => {
      if (x.target.value === country.currencyName) {
        this.conversion.secondSymbol = country.currencySymbol || '';
        this.currOneValid = true;
        console.log(this.currOneValid);
        return;
      }
    });
  }

  checkIfCurrencyTwoIsValid(y: any): any {
    console.log(y.target.value);
    this.countries.forEach((country: any) => {
      if (y.target.value === country.currencyName) {
        this.conversion.secondSymbol = country.currencySymbol || '';
        this.currTwoValid = true;
        console.log(this.currTwoValid);
        return;
      }
    });
  }

  openCookiesDialog() {
    this.dialog
      .open(CookiesDialogComponent, {
        disableClose: true,
        panelClass: ['cookies-dialog'],
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        this.common.storeCookie(res);
        this.common.openSnackbar('Cookie preference saved!');
      });
  }

  openTermsDialog() {
    this.dialog.open(TermsComponent, {
      disableClose: false,
      panelClass: ['terms-dialog'],
      maxHeight: '90vh',
    });
  }

  openPrivacyDialog() {
    this.dialog.open(GenericDialogComponent, {
      disableClose: false,
      panelClass: ['privacy-dialog'],
      maxHeight: '90vh',
    });
  }

  openContactDialog() {
    this.dialog
      .open(ContactComponent, {
        disableClose: false,
        panelClass: ['contact-dialog'],
        maxHeight: '90vh',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          console.log(res);
          this.api.sendContactEmail('sendEmail', res).subscribe(
            (res) => {
              this.common.openSnackbar(res.msg);
            },
            (err) => {
              this.common.openSnackbar('Error connecting to server!');
            }
          );
        }
      });
  }
}

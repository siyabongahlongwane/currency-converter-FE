import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { CookiesDialogComponent } from '../cookies-dialog/cookies-dialog.component';
import { CommonService } from '../services/common.service'
import { ContactComponent } from '../contact/contact.component';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { PrivacyDialogComponent } from '../privacy-dialog/privacy-dialog.component';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrls: ['./home-client.component.scss']
})
export class HomeClientComponent implements OnInit {
  @ViewChild('conversionForm') conversionForm: NgForm | undefined;
  currentYear: Number = new Date().getFullYear();
  currOneValid: boolean = false;
  currTwoValid: boolean = false;
  spinner: boolean = false;
  skeleton: boolean = false;
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  conversion: any = {
    date: new Date().toDateString().slice(0, 10),
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
    private userService: UserService,
    private dialog: MatDialog,
    private common: CommonService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getCountries();
    if (this.common.checkCookie() === null) {
      this.openCookiesDialog();
    }
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
  getConversionRate(): any {
    this.skeleton = false;
    this.submitted = true;
    this.showConversion = false;
    if (!this.conversion.amount || !this.currOneValid || !this.currTwoValid) {
      this.showError = true;
      return false;
    }
    this.skeleton = true;
    this.getFirstCurrencyCode(this.conversionForm?.value.firstCurrencyName);
    this.getSecondCurrencyCode(this.conversionForm?.value.secondCurrencyName);
    this.conversion.source = 'app';
    this.conversion = Object.assign(
      this.conversion,
      this.conversionForm?.value
    );
    let queryString = Object.keys(this.conversion)
      .map((key) => key + '=' + this.conversion[key])
      .join('&');
    this.api.getCurrencies(`convertCurrency?${queryString}`).subscribe(
      (res: any) => {
        if (res) {
          this.conversion = res;
          this.showConversion = true;
          this.skeleton = false;
        }
      },
      (msg) => {
        this.showConversion;
        this.common.openSnackbar(msg.error || 'Error converting currencies!');
        this.skeleton = false;
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
    this.currOneValid = true;
    this.countries.forEach((country: any) => {
      if (x.target.value === country.currencyName) {
        this.conversion.secondSymbol = country.currencySymbol || '';
        this.currOneValid = true;
        return;
      }
    });
  }

  checkIfCurrencyTwoIsValid(y: any): any {
    this.currTwoValid = true;
    this.countries.forEach((country: any) => {
      if (y.target.value === country.currencyName) {
        this.conversion.secondSymbol = country.currencySymbol || '';
        this.currTwoValid = true;
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
        this.common.storeCookie(res);
        this.common.openSnackbar('Cookie preference saved!');
      });
  }

  openTermsDialog() {
    this.dialog.open(TermsDialogComponent, {
      disableClose: false,
      panelClass: ['terms-dialog'],
      maxHeight: '90vh',
    });
  }

  openPrivacyDialog() {
    this.dialog.open(PrivacyDialogComponent, {
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
          this.api.sendContactEmail('sendEmail', res).subscribe(
            (res) => {
              this.common.openSnackbar(res.msg);
            },
            (msg) => {
              this.common.openSnackbar(msg.error || 'Error connecting to server!');
            }
          );
        }
      });
  }

  roundDownToFiveDecimals(num: any) {
    num = num.toString();
    if (num.includes('.')) {
      num = num.split('.');
      num = num[0] + '.' + num[1].slice(0, 5);
    }
    return num;
  }
}

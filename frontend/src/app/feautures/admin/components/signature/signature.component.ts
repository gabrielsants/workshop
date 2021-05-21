import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent {
  constructor(private formBuilder: FormBuilder) {
    this.init();
  }

  matcher = new CustomErrorStateMatcher();
  signatureForm: FormGroup;
  signature: Signature = null;
  isVisible = false;

  addressList: Address[] = [
    { value: 'Av. Antonio Carlos Paniago, 15', cep: 'CEP 75830-000 - Mineiros / GO ' },
    { value: 'Av. Cel. Macario S. de Oliveira, 1093', cep: 'CEP 78785-000 - Alto Taquari / MT ' },
    { value: 'Av. Said Abdalla, 350', cep: 'CEP 75800-000 - Jatai / GO' },
  ];

  generate() {
    this.isVisible = true;
    this.signature = this.signatureForm.value;
    console.log(this.signature);
  }

  private init() {
    this.signatureForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      phone: ['', Validators.required],
      skype: ['', Validators.required],
      office: ['', Validators.required],
      email: ['', Validators.email],
      dealership: [''],
      address: ['', Validators.required],
      site: [''],
    });

    this.signatureForm.controls['dealership'].setValue('Volmaq');
    this.signatureForm.controls['site'].setValue('volmaq.com.br');
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export interface Address {
  value: string;
  cep: string;
}

export interface Signature {
  full_name: string;
  phone: string;
  skype: string;
  office: string;
  email: string;
  dealership: string;
  address: Address;
  site: string;
}

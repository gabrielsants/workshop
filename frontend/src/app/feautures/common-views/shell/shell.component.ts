import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';

import { AuthenticationService, CredentialsService } from '../../auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private credentialsService: CredentialsService,
    private media: MediaObserver
  ) {}

  ngOnInit() {}

  isAdmin() {
    return localStorage.getItem('role') == '1' || localStorage.getItem('role') == '1' ? true : false;
  }

  isMechanic() {
    return localStorage.getItem('role') == '2' || localStorage.getItem('role') == '1' ? true : false;
  }

  isClerk() {
    return localStorage.getItem('role') == '3' || localStorage.getItem('role') == '1' ? true : false;
  }

  isStockist() {
    return localStorage.getItem('role') == '4' || localStorage.getItem('role') == '1' ? true : false;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get displayname(): string | null {
    const credentials = this.credentialsService.credentials;
    return credentials ? credentials.username : null;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}

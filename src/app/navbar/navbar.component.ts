import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import {MatMenuModule ,MatMenu,MatMenuTrigger } from '@angular/material/menu';
import { User } from '../models/User';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, CommonModule, MatToolbarModule,MatMenu,MatMenuTrigger,
    MatIconModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  storageService = new StorageService()
  router = inject(Router);

  userDetails:User = new User();


  constructor(){
    const userData = this.storageService.getUser();
    if (userData) {
        this.userDetails.email=userData.email;
        this.userDetails.name=userData.name;
        this.userDetails.imageUrl=userData.picture;
    }
  }


  isLoggedIn() {
    return this.storageService.getUser()
  }

  doLogout() {
    this.router.navigate(['/authentication'])
    this.storageService.removeUser()
  }


  yourFirstAction() {

  }
  yourSecondAction() {

  }
  yourThirdAction() {

  }

}
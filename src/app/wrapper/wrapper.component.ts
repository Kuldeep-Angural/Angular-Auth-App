import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from "../pages/authentication/authentication.component";
import { ToasterComponent } from "../toaster/toaster.component";
import { Router } from 'express';
import { RouterOutlet } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-wrapper',
  standalone: true,
  imports: [NavbarComponent, CommonModule, AuthenticationComponent, ToasterComponent, RouterOutlet, FooterComponent],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.css'
})
export class WrapperComponent {
  storageService = new StorageService();

 isLoggedIn(){
  return this.storageService.getUser()
 }

}

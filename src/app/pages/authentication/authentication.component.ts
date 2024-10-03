import { CommonModule } from '@angular/common';
import { Component, inject, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { loginAction, SESSION_KEYS } from '../../constants/constant';
import { InputComponent } from '../../input/input.component';
import { Login } from '../../models/Login';
import { Signup } from '../../models/SignUp';
import { AuthService } from '../../services/AuthService';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [InputComponent, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, CommonModule, MatCardModule, MatButtonModule, MatIconModule,],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent {
  authService = new AuthService();
  loginForm: FormGroup;
  signupForm: FormGroup;
  router = inject(Router);


  popupWidth = 500;
  popupHeight = 600;

  activeForm: 'login' | 'signup' = 'login';
 

  constructor(private fb: FormBuilder, private toasterService: ToasterService, private ngZone: NgZone) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  changeForm(form: 'signup' | 'login'): void { this.activeForm = form }


  getPopupFeatures(): string {
    const left = (window.screen.width - this.popupWidth) / 2;
    const top = (window.screen.height - this.popupHeight) / 2;
    return `width=${this.popupWidth},height=${this.popupHeight},top=${top},left=${left}`;
  }


  onSubmit(): void {
    if (this.activeForm === 'login' && this.loginForm.valid) {
      const loginModel = new Login();
      loginModel.email = this.loginForm.value.email;
      loginModel.password = this.loginForm.value.password;
      console.log('Login:', loginModel);
      this.authService.login(loginModel).then((response: any) => {
        console.log(response);

      })
    }

    if (this.activeForm === 'signup' && this.signupForm.valid) {
      const signupModel = new Signup();
      signupModel.name = this.signupForm.value.name;
      signupModel.email = this.signupForm.value.email;
      signupModel.mobile = this.signupForm.value.mobile;
      signupModel.password = this.signupForm.value.password;
      console.log('Signup:', signupModel);
      this.authService.registerUser(signupModel).then((response: any) => {
        console.log(response);

      })
    }
  }

   getUserInfo(accessToken: string, action: string) {
    const urls = {
      [loginAction.GOOGLE]: 'https://www.googleapis.com/oauth2/v2/userinfo',
      [loginAction.FACEBOOK]: `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email`,
    };
  
    fetch(urls[action], {
      headers: action === loginAction.GOOGLE ? { Authorization: `Bearer ${accessToken}` } : {},
    })
      .then((res) => res.json())
      .then((userInfo) => {
        this.ngZone.run(() => {
          console.log('User Info:', userInfo);
          localStorage.setItem(SESSION_KEYS.USER, JSON.stringify(userInfo));
          
          // Navigate to the onboarding page after user info retrieval
          this.router.navigate(['/']); // Redirect to the onboarding page
  
          // Handle specific actions based on the login action
          // action === loginAction.GOOGLE 
          //   ? this.authService.googleAction({
          //       email: userInfo?.email,
          //       name: userInfo.name,
          //       googleId: userInfo.id,
          //       imageUrl: userInfo.picture
          //     })
          //   : this.authService.facebookAction({
          //       email: userInfo?.email,
          //       name: userInfo.name,
          //       facebookId: userInfo.id,
          //       imageUrl: userInfo.picture
          //     });
        });
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }
  


  private handleAuthPopup(popup: Window | null, action: string): void {
    const pollTimer = window.setInterval(() => {
      try {
        if (popup && popup.closed) {
          window.clearInterval(pollTimer);
        }

        if (popup && popup.location.href.includes(environment.REDIRECT_URL)) {
          const urlParams = new URLSearchParams(popup.location.hash.substring(1));

          const accessToken = urlParams.get('access_token');
          console.log(accessToken);

          if (accessToken) {
            window.clearInterval(pollTimer);
            popup.close();
            this.getUserInfo(accessToken, action);
          }
        }
      } catch (error) {
      }
    }, 1000);
  }


  signInWithFacebook(): void {
    const facebookAuthUrl = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${environment.FACEBOOK_APP_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=email,public_profile`;
    const popup = window.open(facebookAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.FACEBOOK);
  }

  signInWithGoogle(): void {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${environment.GOOGLE_CLIENT_ID}&redirect_uri=${environment.REDIRECT_URL}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&prompt=select_account`;
    const popup = window.open(googleAuthUrl, '_blank', this.getPopupFeatures());
    this.handleAuthPopup(popup, loginAction.GOOGLE);
  }
}

import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthenticationComponent } from '../pages/authentication/authentication.component';
import { OnboardingComponent } from '../pages/onboarding/onboarding.component';
import { PagenotfoundComponent } from '../pages/pagenotfound/pagenotfound.component';

export const routes: Routes = [
    { path: '', component: OnboardingComponent, canActivate: [authGuard] },
    { path: 'authentication', component: AuthenticationComponent }, 
    { path: 'notFound', component: PagenotfoundComponent }, 
    { path: '**', redirectTo: 'notFound' }
];

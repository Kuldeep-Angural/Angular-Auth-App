import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthenticationComponent } from '../pages/authentication/authentication.component';
import { OnboardingComponent } from '../pages/onboarding/onboarding.component';
import { PagenotfoundComponent } from '../pages/pagenotfound/pagenotfound.component';
import { ProductView } from '../pages/onboarding/productview-component';

export const routes: Routes = [
    { path: '', component: OnboardingComponent, canActivate: [authGuard] },
    { path: 'onboarding', component: OnboardingComponent, },

    { path: 'authentication', component: AuthenticationComponent }, 
    { path: 'notFound', component: PagenotfoundComponent }, 
    { path: 'productView/:id', component: ProductView },
    { path: '**', redirectTo: 'notFound' }
];

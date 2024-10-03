import { Injectable } from '@angular/core';
import axios from 'axios'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public baseUrl = environment.BACKEND_HOST+'/Auth'


  googleAction(credentials: any) {
    return axios.post(this.baseUrl + '/google', credentials)
  }

  facebookAction(credentials: any) {
    return axios.post(this.baseUrl + '/faceBook', credentials)
  }

  registerUser(credentials:any){
    return axios.post(this.baseUrl + '/register', credentials)
  }
  
  login(credentials:any){
    return axios.post(this.baseUrl + '/login', credentials)
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';


const BASE_URL = "http://localhost:8090/api/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  postCar(formData: any) {
    return this.http.post(BASE_URL + '/car', formData, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarList() {
    return this.http.get(BASE_URL + '/cars', {
      headers: this.createAuthorizationHeader()
    });
  }


  getCarListByPincode(pincode: string) {
    return this.http.get(BASE_URL + `/cars/search/${pincode}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  getMyCars(userId: string) {
    return this.http.get(BASE_URL + `/my-cars/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  deleteMyCar(id: string): Observable<any> {
    return this.http.delete(BASE_URL + `/car/${id}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  getWishList(userId: string) {
    return this.http.get(BASE_URL + `/cars/my-wishlist/${userId}`, {
      headers: this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader() {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set('Authorization', 'Bearer ' + StorageService.getToken());
  }

}

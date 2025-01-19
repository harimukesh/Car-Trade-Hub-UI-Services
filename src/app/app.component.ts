import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sellcar_angular';

  isAdminLoggedIn = StorageService.isAdminLoggIn();
  isCustomerLoggedIn = StorageService.isCustomerLoggIn();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event.constructor.name === "NavigationEnd") {
        this.isAdminLoggedIn = StorageService.isAdminLoggIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggIn();
      }
    });
  }

  logout() {
    window.localStorage.clear();
    this.isAdminLoggedIn = false;
    this.isCustomerLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

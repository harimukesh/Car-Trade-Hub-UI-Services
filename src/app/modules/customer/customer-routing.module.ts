import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { BookACarComponent } from './components/book-a-car/book-a-car.component';
import { ViewBidsComponent } from './components/view-bids/view-bids.component';
import { ManageBidsComponent } from './components/manage-bids/manage-bids.component';

const routes: Routes = [
  { path: 'dashboard', component: CustomerDashboardComponent },
  { path: 'post-car/:id', component: PostCarComponent, },
  { path: 'car/:carId/book', component: BookACarComponent, },
  { path: 'post-car', component: PostCarComponent, },
  { path: 'my-car', component: MyCarsComponent },
  { path: 'my-bids', component: ViewBidsComponent },
  { path: 'manage-bids/:carId', component: ManageBidsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

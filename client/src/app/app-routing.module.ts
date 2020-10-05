import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { AboutComponent } from './components/home/about/about.component';
import { HomeComponent } from './components/home/home/home.component';
import { UpdatesComponent } from './components/home/updates/updates.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ProductListComponent } from './components/shop/product-list/product-list.component';
import { ShopComponent } from './components/shop/shop.component';
import { AddToCartComponent } from './components/shop/add-to-cart/add-to-cart.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';
import { AddProductAdminComponent } from './components/admin/add-product-admin/add-product-admin.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { OrderComponent } from './components/order/order.component';



const routes: Routes = [

  { path: "register", pathMatch: "full", component: RegisterComponent },
  {
    path: 'allproducts', pathMatch: "full", component: ShopComponent
  },
  {
    path: 'order', pathMatch: "full", component: OrderComponent
  },
  { path: 'adminarea', pathMatch: "full", component: AdminComponent },
  {
    path: "", pathMatch: "full", component: HomeComponent
  },
  {
    path:"add",pathMatch:"full", component:AddProductAdminComponent
  }
]


// { path: "", pathMatch: "full", component: ListComponent },
// { path: "**", redirectTo: "" }


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  LoginComponent, AboutComponent, RegisterComponent, ProductListComponent]

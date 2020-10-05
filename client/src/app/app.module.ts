import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule} from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDialogModule, MatDialogConfig} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/home/login/login.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { AboutComponent } from './components/home/about/about.component';
import { UpdatesComponent } from './components/home/updates/updates.component';
import { HomeComponent } from './components/home/home/home.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ProductListComponent } from './components/shop/product-list/product-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ShopComponent } from './components/shop/shop.component';
import { AddToCartComponent } from './components/shop/add-to-cart/add-to-cart.component';
import { CartComponent } from './components/shop/cart/cart.component';
import { SearchProductsComponent } from './components/shop/search-products/search-products.component';
import {MatTableModule} from '@angular/material/table';

import { ProductListAdminComponent } from './components/admin/product-list-admin/product-list-admin.component';
import { EditAdminComponent } from './components/admin/edit-admin/edit-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductAdminComponent } from './components/admin/add-product-admin/add-product-admin.component';
import { OrderComponent } from './components/order/order.component';
import { CartOrderComponent } from './components/order/cart-order/cart-order.component';
import { OrderDetailsComponent } from './components/order/order-details/order-details.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ReceiptComponent } from './components/order/receipt/receipt.component';
import { SearchProductsOrderComponent } from './components/order/search-products-order/search-products-order.component';
import { ReceiptErrorComponent } from './components/order/receipt-error/receipt-error.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    UpdatesComponent,
    HomeComponent,
    RegisterComponent,
    ProductListComponent,
    ShopComponent,
    AddToCartComponent,
    CartComponent,
    SearchProductsComponent,
    AdminComponent,
    ProductListAdminComponent,
    EditAdminComponent,
    AddProductAdminComponent,
    OrderComponent,
    CartOrderComponent,
    OrderDetailsComponent,
    ReceiptComponent,
    SearchProductsOrderComponent,
    ReceiptErrorComponent
  ],
  entryComponents:[AddToCartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    MatStepperModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatSidenavModule,
    MatStepperModule,
    MatListModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }


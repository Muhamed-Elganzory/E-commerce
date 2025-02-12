import { Routes } from '@angular/router';
import {UserLayoutComponent} from './core/layouts/user-layout/user-layout.component';
import {LoginComponent} from './core/auth/components/login/login.component';
import {RegisterComponent} from './core/auth/components/register/register.component';
import {HomeComponent} from './features/home/components/home/home.component';
import {CategoryComponent} from './features/category/components/category/category.component';
import {CartComponent} from './features/cart/components/cart/cart.component';
import {NotFoundComponent} from './core/auth/components/not-found/not-found.component';
import {AuthLayoutComponent} from './core/layouts/auth/auth-layout.component';
import {ProductListComponent} from './features/product/components/product-list/product-list.component';
import {BrandListComponent} from './features/brands/components/brand-list/brand-list.component';
import {ProductDetailsComponent} from './features/product/components/product-details/product-details.component';

export const routes: Routes = [
  {path: '', component: AuthLayoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  {path: '', component: UserLayoutComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'products', component: ProductListComponent},
      {path: 'product-details/:id', component: ProductDetailsComponent},
      {path: 'brands', component: BrandListComponent},
      {path: 'cart', component: CartComponent},
    ]
  },
  {path: '**', component: NotFoundComponent},
];

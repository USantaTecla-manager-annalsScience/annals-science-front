import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryCreateEditModule } from './pages/category-create-edit/category-create-edit.module';
import { EntityCreateEditModule } from './pages/entity-create-edit/entity-create-edit.module';
import { EntityDetailModule } from './pages/entity/entity-detail/entity-detail.module';
import { EntityViewModule } from './pages/entity/entity.module';
import { HomeModule } from './pages/home/home.module';
import { AuthInterceptorService } from './services/interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    EntityViewModule,
    EntityCreateEditModule,
    EntityDetailModule,
    CategoryCreateEditModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

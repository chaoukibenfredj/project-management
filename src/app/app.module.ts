import { AuthGuardService } from './../utils/guards/auth-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule, NbLayoutModule, NbSidebarModule,
  NbMenuModule, NbSidebarService, NbCardModule,
  NbSpinnerModule, NbInputModule, NbButtonModule,
  NbActionsModule, NbUserModule, NbToastrService,
  NbDatepickerModule, NbDateAdapterService,
  NbToastrModule, NbContextMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AppLayoutComponent } from './Pages/app-layout/app-layout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DialogService } from './service/dialog.service';
import { API_URL } from 'src/utils/API_URL.const';
import { CanDeactivateGuard } from 'src/utils/guards/can-deactivate.guard';
import { Globals } from './service/globals.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AppLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    NbCardModule,
    NbSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    HttpClientModule,
    NbActionsModule,
    NbUserModule,
    NbToastrModule.forRoot(),
    Ng2SmartTableModule,
    NbContextMenuModule,
  ],
  providers: [
    NbSidebarService,
    AuthGuardService,
    NbToastrService,
    DialogService,
    Globals,
    CanDeactivateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

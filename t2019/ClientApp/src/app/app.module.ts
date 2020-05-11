import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, RouterStateSnapshot } from '@angular/router';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeMenuComponent } from './components/home/home-menu/home-menu.component';
import { ParteDiarioComponent } from './components/rrhh/novedades/parte-diario/parte-diario.component';
import { ModalMarcacionComponent } from './components/rrhh/novedades/modal-marcacion/modal-marcacion.component';


// Angular Material Components
import { MatCheckboxModule, DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material';
import {
  MatMomentDateModule,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatBadgeModule } from '@angular/material/badge';

// Servicios
import { AppRoutingModule } from './app-routing.module';
import { LoginService } from './services/login/login.service';
import { LoginEndPoint } from './services/login/login-endpoint';
import { NominaService } from './services/rrhh/nomina/nomina.service';
import { NominaEndPoint } from './services/rrhh/nomina/nomina-endpoint';
import { NovedadesService } from './services/rrhh/novedades/novedades.service';
import { NovedadesEndPoint } from './services/rrhh/novedades/novedades-endpoint';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { DatepickerComponent } from './components/utils/datepicker/datepicker.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimepickerComponent } from './components/utils/timepicker/timepicker.component';
import { UserValuesService } from './services/utils/user-values.service';
import { StorageModule } from '@ngx-pwa/local-storage';
import { AuthGuard } from './services/utils/auth.guard';
import { SenderService } from './services/utils/sender.service';
import { LoginComponent } from './components/login/login.component';
import { SnackBarService } from './services/utils/snackBar.service';
import { HomeFooterComponent } from './components/home/home-footer/home-footer/home-footer.component';
import { AlertComponent } from './components/utils/alert/alert/alert.component';
import { LoginIngresoComponent } from './components/login/login-ingreso/login-ingreso.component';
import { LoginRecuperarPassComponent } from './components/login/login-recuperar-pass/login-recuperar-pass.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptorService } from './services/utils/loader-interceptor.service';

declare var $: any;
registerLocaleData(localeEsAr, 'es-AR');


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeMenuComponent,
    HomeFooterComponent,
    ParteDiarioComponent,
    ModalMarcacionComponent,
    DatepickerComponent,
    TimepickerComponent,
    AlertComponent,
    LoginIngresoComponent,
    LoginRecuperarPassComponent
  ],
  entryComponents: [
    ModalMarcacionComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatMomentDateModule,
    DragDropModule,
    MatBadgeModule,
    NgxMaterialTimepickerModule.setLocale('es-AR'),
    StorageModule.forRoot({ IDBNoWrap: true }),
    NgxSpinnerModule
  ],
  providers: [ // Se declaran los servicios
    LoginService,
    LoginEndPoint,
    NominaService,
    NominaEndPoint,
    NovedadesService,
    NovedadesEndPoint,
    UserValuesService,
    AuthGuard,
    SenderService,
    SnackBarService,
    LoadingInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorService,
      multi: true
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



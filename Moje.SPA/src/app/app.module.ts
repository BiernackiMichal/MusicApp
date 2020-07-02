import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { GestureConfig} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule, MatCardTitle} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule, matSelectAnimations} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxAudioPlayerModule, MaterialModule } from 'ngx-audio-player';
import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ToastrModule} from 'ngx-toastr';
import {MatTreeModule} from '@angular/material/tree';




import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SongsLayoutComponent } from './songsLayout/songsLayout.component';
import { AuthService } from './_services/auth.service';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/authGuard/auth.guard';
import { AddSongFormComponent } from './addSongForm/addSongForm.component';
import { SongsService } from './_services/songs.service';
import { from } from 'rxjs';
import { MatSortModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule, MatProgressSpinner,
          } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { EditSongFormComponent } from './editSongForm/editSongForm.component';
import { DeleteSongConfirmationComponent } from './deleteSongConfirmation/deleteSongConfirmation.component';
import { AdminManagePanelComponent } from './AdminManagePanel/AdminManagePanel.component';
import { EditUserFormComponent } from './EditUserForm/EditUserForm.component';
import { DeleteUserConfirmationComponent } from './deleteUserConfirmation/deleteUserConfirmation.component';
import { SetsLayoutComponent } from './setsLayout/setsLayout.component';
import { EditSetFormComponent } from './editSetForm/editSetForm.component';
import { AddSetFormComponent } from './addSetForm/addSetForm.component';
import { DeleteSetConfirmationComponent } from './deleteSetConfirmation/deleteSetConfirmation.component';
import { ChangeRowColorPipe } from './_pipes/changeRowColor.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent,
      SongsLayoutComponent,
      RegisterComponent,
      AddSongFormComponent,
      EditSongFormComponent,
      DeleteSongConfirmationComponent,
      AdminManagePanelComponent,
      EditUserFormComponent,
      DeleteUserConfirmationComponent,
      SetsLayoutComponent,
      EditSetFormComponent,
      AddSetFormComponent,
      DeleteSetConfirmationComponent,
      ChangeRowColorPipe
   ],
   entryComponents: [
      DeleteSongConfirmationComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      MatInputModule,
      MatCardModule,
      MatFormFieldModule,
      MatSidenavModule,
      MatMenuModule,
      MatToolbarModule,
      MatSelectModule,
      NgxAudioPlayerModule,
      MatButtonModule,
      MatTableModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatSortModule,
      MatIconModule,
      ToastrModule.forRoot(),
      MatDialogModule,
      MatTreeModule,
      MatProgressSpinnerModule,
      BrowserModule,
      MaterialModule,
      MatSliderModule,
      BrowserAnimationsModule,
      CommonModule,
      HammerModule



   ],
   providers: [
      AuthService,
      AuthGuard,
      SongsService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {
constructor(library: FaIconLibrary) {
library.addIconPacks(fas);
library.addIcons(faCoffee);
 }
}

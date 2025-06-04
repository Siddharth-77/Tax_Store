import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgOtpInputModule } from 'ng-otp-input';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { DatePipe } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        NgOtpInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
        DatePipe,
        MatSnackBarModule,
        MatStepperModule,
        MatTabsModule,
        PerfectScrollbarModule,
        NgxSpinnerModule,
        NgSelectModule


    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatTooltipModule,
        NgOtpInputModule,
        MatMenuModule,
        MatCheckboxModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatRadioModule,
        DatePipe,
        MatStepperModule,
        MatTabsModule,
        PerfectScrollbarModule,
        NgxSpinnerModule,
        NgSelectModule
    ],
    providers: [DatePipe],
})
export class SharedModule {}

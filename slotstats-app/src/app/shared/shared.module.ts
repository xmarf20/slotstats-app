import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { AppModule } from '../app.module';



@NgModule({
  declarations: [NavigationComponent],
  imports: [
    AppModule,
    CommonModule
  ]
})
export class SharedModule { }

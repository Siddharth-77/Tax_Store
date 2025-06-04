import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './tasks/add-task/add-task.component';



const routes: Routes = [
  {
    path: 'tasks',
    component: TasksComponent,
    title: 'Tax Store - Tasks',
  }
];

@NgModule({
  declarations: [
    TasksComponent,
    AddTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class TasksModule { }

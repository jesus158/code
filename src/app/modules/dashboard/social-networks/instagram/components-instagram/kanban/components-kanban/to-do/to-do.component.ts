import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  providers: [CdkDropListGroup, CdkDropList, NgFor, CdkDrag],
})
export class ToDoComponent {
  one = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep',
    'Walk dog',
  ];

  two = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  three = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
  ];

  four = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  five = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

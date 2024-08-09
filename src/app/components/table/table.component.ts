import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) rows: any = [];

  isTwoDimensionalArray(arr: any): boolean {
    // Check if the first element is an array
    return Array.isArray(arr) && Array.isArray(arr[0]);
  }
}

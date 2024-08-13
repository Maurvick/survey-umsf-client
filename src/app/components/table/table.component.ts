import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input({ required: true }) headers: string[] = [];
  @Input({ required: true }) rows: string[][] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.extractValues(this.rows);
  }

  isTwoDimensionalArray(arr: any): boolean {
    // Check if the first element is an array
    return Array.isArray(arr) && Array.isArray(arr[0]);
  }

  extractValues(arr: any[]): void {
    let extractedValues: any[] = [];
    let sortedRows: any[][] = [];
    let itemsPerRow = this.headers.length;

    extractedValues = arr
      .flatMap((obj) => Object.values(obj))
      .map((item) => String(item));

    for (let i = 0; i < extractedValues.length; i += itemsPerRow) {
      sortedRows.push(extractedValues.slice(i, i + itemsPerRow));
    }

    console.log(sortedRows);

    this.rows = sortedRows;
  }
}

import {LiveAnnouncer} from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableFilter } from 'mat-table-filter';
import {MatSort, Sort} from '@angular/material/sort';

export class Captain {
  name: string;
  surname: string;
}

export class SpaceCraft {
  name: string;
  isConstitutionClass: boolean;
  captain: Captain;
}

const SPACECRAFT_DATA: SpaceCraft[] = [
  { name: 'Endurance', isConstitutionClass: false, captain: { name: 'Joseph', surname: 'Cooper' } },
  { name: 'Enterprise', isConstitutionClass: false, captain: { name: 'Christopher', surname: 'Pike' } },
  { name: 'Discovery', isConstitutionClass: false, captain: { name: 'Christopher', surname: 'Pike' } },
  { name: 'Enterprise', isConstitutionClass: false, captain: { name: 'Jean-Luc', surname: 'Pickard' } }
];

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-mat-table-filter',
  templateUrl: './mat-table-filter.component.html',
  styleUrls: ['./mat-table-filter.component.css']
})

// export class MatTableFilterComponent implements OnInit {
//   filterEntity: SpaceCraft;
//   filterType: MatTableFilter;
//   displayedColumns: string[] = ['name', 'captainName', 'captainSurname', 'isConstitutionClass'];
//   dataSource:any;

//   constructor() { }

//   ngOnInit(): void {
//         // Do not forget to initialize your object and it's non-primitive properties
//         this.filterEntity = new SpaceCraft();
//         this.filterEntity.captain = new Captain();
//         this.filterType = MatTableFilter.ANYWHERE;
//         this.dataSource = new MatTableDataSource(SPACECRAFT_DATA);
//   }

// }

export class MatTableFilterComponent implements AfterViewInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
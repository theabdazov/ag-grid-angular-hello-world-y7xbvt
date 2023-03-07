import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ColDef,
  GridReadyEvent,
  InitialGroupOrderComparatorParams,
  RowGroupingDisplayType,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { data } from './data';

interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public columnDefs: ColDef[] = [
    { field: 'country', rowGroup: true, hide: true },
    { field: 'year' },
    { field: 'sport', rowGroup: true, hide: true },
    { field: 'athlete', minWidth: 200 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
    { field: 'age' },
    { field: 'date', minWidth: 140 },
  ];
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    sortable: true,
  };
  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public groupDisplayType: RowGroupingDisplayType = 'groupRows';
  public initialGroupOrderComparator: (
    params: InitialGroupOrderComparatorParams
  ) => number = (params: InitialGroupOrderComparatorParams) => {
    const a = params.nodeA.key || '';
    const b = params.nodeB.key || '';
    return a < b ? -1 : a > b ? 1 : 0;
  };
  public rowData!: IOlympicData[];
  public gridApi;

  constructor(private http: HttpClient) {}

  onGridReady(params: GridReadyEvent<IOlympicData>) {
    this.gridApi = params.api;
  }

  addRowToGrid() {
    const row = data.pop();
    this.gridApi.applyTransactionAsync({ add: [row] }, () => {});
  }
}

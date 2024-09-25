import { Component, OnInit } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { AgCharts } from 'ag-charts-angular';
import { GraficService } from '../../services/grafics';

@Component({
  selector: 'graficos',
  standalone: true,
  imports: [AgCharts],
  templateUrl: './graficos.component.html',
  styleUrl: './graficos.component.scss'
})

export class GraficosComponent implements OnInit {
  public barChartOptions: AgChartOptions = { data: [], series: [] };
  public lineChartOptions: AgChartOptions = { data: [], series: [] };



  constructor(private graficService: GraficService ) {}
  ngOnInit() {
    this.loadData();
  }
  

  loadData() {
    this.graficService.getSales().subscribe(data => {
      this.barChartOptions = {
        data: data,
        series: [
          {
            type: 'bar',
            xKey: 'month',
            yKey: 'sales',
            
          }
        ]
      };

      this.lineChartOptions = {
        data: data,
        series: [
          {
            type: 'line',
            xKey: 'month',
            yKey: 'sales'
          }
        ]
      };
    });
  }
}

import { Component, Input, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {

  @Input() selectedCustomer: any;
  chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedCustomer'] && this.selectedCustomer) {
      this.displayChart(this.selectedCustomer);
    }
  }

  displayChart(customer: any): void {
    if (!customer || !customer.transactions) {
      console.error('Customer or customer transactions are null');
      return;
    }

    const customerTransactions = customer.transactions;
    const datesMap = new Map<string, number>();

    customerTransactions.forEach((transaction: any) => {
      const date = transaction.date;
      const amount = transaction.amount;

      if (datesMap.has(date)) {
        datesMap.set(date, datesMap.get(date)! + amount);
      } else {
        datesMap.set(date, amount);
      }
    });

    const labels = Array.from(datesMap.keys());
    const data = Array.from(datesMap.values());

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = document.getElementById('transactionChart') as HTMLCanvasElement;
    if (!ctx) {
      console.error('Failed to get the canvas element');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Total Transaction Amount',
          data: data,
          backgroundColor: '#000',
          borderColor: '#000',
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Date'
            }
          }
        }
      }
    });
  }
}

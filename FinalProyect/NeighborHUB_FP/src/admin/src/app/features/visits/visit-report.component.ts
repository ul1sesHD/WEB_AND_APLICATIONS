import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisitService } from './visit.service';
import { BreadcrumbComponent } from '../../shared/components/breadcrumb/breadcrumb.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { CsvDownloadService } from '../../core/jquery/csv-download.service';
import { ToastService } from '../../core/jquery/toast.service';
import * as Papa from 'papaparse';

@Component({
  selector: 'admin-visit-report',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, StatCardComponent],
  template: `
    <admin-breadcrumb [items]="[{label:'Admin',link:'/'},{label:'Visits',link:'/visits'},{label:'Reports'}]" />
    <h5 class="text-uppercase font-display mb-3">Visit Reports</h5>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <admin-stat-card label="Total Visits" [value]="agg().totalVisits" color="var(--color-sign-blue)" />
      </div>
      <div class="col-md-4">
        <admin-stat-card label="Total km Saved" [value]="agg().totalKm" color="var(--color-quellite-green)" />
      </div>
      <div class="col-md-4">
        <admin-stat-card label="Total CO₂ Avoided (kg)" [value]="agg().totalCo2" color="var(--color-toldo-red)" />
      </div>
    </div>

    <div class="card shadow-sm mb-3">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h6 class="mb-0">Top Users by Visits</h6>
        <button class="btn btn-outline-secondary btn-sm" (click)="exportCsv()">Export CSV</button>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-sm">
            <thead class="table-light">
              <tr>
                <th>User</th>
                <th>Visits</th>
                <th>km Saved</th>
                <th>CO₂ (kg)</th>
                <th>Spending</th>
              </tr>
            </thead>
            <tbody>
              @for (u of agg().topBusinesses; track u.user_id) {
                <tr>
                  <td>{{ u.name }}</td>
                  <td>{{ u.total_visits }}</td>
                  <td>{{ u.total_km_saved | number:'1.1-1' }}</td>
                  <td>{{ u.total_co2_saved_kg | number:'1.2-2' }}</td>
                  <td>{{ u.total_local_spending | currency:'MXN' }}</td>
                </tr>
              } @empty {
                <tr><td colspan="5" class="text-center text-muted py-3">No data.</td></tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class VisitReportComponent implements OnInit {
  private service = inject(VisitService);
  private csvService = inject(CsvDownloadService);
  private toast = inject(ToastService);

  agg = signal({ totalKm: 0, totalCo2: 0, totalVisits: 0, topBusinesses: [] as any[] });

  ngOnInit(): void {
    this.service.getAggregates().subscribe((a) => this.agg.set(a));
  }

  exportCsv(): void {
    const rows = this.agg().topBusinesses.map((u: any) => ({
      User: u.name,
      Visits: u.total_visits,
      'km Saved': u.total_km_saved,
      'CO2 (kg)': u.total_co2_saved_kg,
      Spending: u.total_local_spending,
    }));
    const csv = Papa.unparse(rows);
    this.csvService.download(csv, `visit-report-${Date.now()}.csv`);
    this.toast.show('CSV downloaded', 'info');
  }
}

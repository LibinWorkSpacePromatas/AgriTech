import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, TrendingUp, AlertTriangle, DollarSign, BarChart3, ShieldCheck } from 'lucide-angular';
import { UserDataService } from '../../core/services/user-data.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profit-risk',
  standalone: true,
  imports: [CommonModule, AdelaideTimePipe, LucideAngularModule],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <div class="header-title-section">
          <i-lucide [img]="TrendingIcon" class="page-icon"></i-lucide>
          <div>
            <h1>Profit & Risk</h1>
            <p class="subtitle">AI-powered harvest forecasting and financial risk appraisal</p>
          </div>
        </div>
      </div>
      
      <div class="metrics-grid" *ngIf="user && user.financials">
        <div class="metric-card gold-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="DollarIcon" class="card-icon"></i-lucide>
            <h3>Projected ROI</h3>
          </div>
          <div class="metric-value">
            <span class="value">{{user.financials.projectedRoi}}</span>
            <span class="unit">%</span>
          </div>
          <div class="metric-footer">
            <i-lucide [img]="BarChartIcon" class="footer-icon"></i-lucide>
            <span>+2.1% from last season</span>
          </div>
        </div>
        
        <div class="metric-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="ShieldIcon" class="card-icon"></i-lucide>
            <h3>Risk Index</h3>
          </div>
          <div class="metric-value">
            <span class="value">{{user.financials.riskIndex}}</span>
          </div>
          <div class="metric-footer">
            <span class="status-indicator" [ngClass]="user.financials.riskIndex === 'Low' ? 'status-normal' : 'status-warning'"></span>
            <span>{{user.financials.riskIndex === 'Low' ? 'Minimal environmental threat' : 'Potential environmental threat'}}</span>
          </div>
        </div>
        
        <div class="metric-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="AlertIcon" class="card-icon"></i-lucide>
            <h3>Potential Loss</h3>
          </div>
          <div class="metric-value">
            <span class="value">{{user.financials.potentialLoss | currency}}</span>
          </div>
          <div class="metric-footer">
            <span>{{user.financials.potentialLoss === 0 ? 'No active threats detected' : 'Threats detected'}}</span>
          </div>
        </div>
      </div>
      
      <div class="content-section mt-4" *ngIf="user && user.financials">
        <div class="card">
          <div class="card-header">
            <h3>Harvest Yield Projections</h3>
          </div>
          <div class="card-body">
            <div class="projection-stats">
              <div class="stat-item">
                <span class="stat-label">Estimated Tonnage</span>
                <span class="stat-value">{{user.financials.estimatedYield}} t/ha</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-label">Market Value (Est.)</span>
                <span class="stat-value">{{user.financials.marketValue | currency}} / ton</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-label">Confidence Level</span>
                <span class="stat-value">{{user.financials.confidenceLevel}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .header-title-section {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }

    .page-icon {
      width: 48px;
      height: 48px;
      color: #059669;
    }

    h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #1e293b;
      margin: 0;
    }

    .subtitle {
      color: #64748b;
      margin: 0.25rem 0 0 0;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .metric-card {
      background: white;
      border-radius: 1.25rem;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .gold-card {
      background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
      border-color: #fde68a;
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .card-icon {
      width: 24px;
      height: 24px;
      color: #d97706;
    }

    h3 {
      font-size: 1rem;
      font-weight: 600;
      color: #475569;
      margin: 0;
    }

    .metric-value {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }

    .value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
    }

    .unit {
      font-size: 1.25rem;
      font-weight: 600;
      color: #64748b;
    }

    .metric-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-normal { background-color: #10b981; }
    .status-warning { background-color: #f59e0b; }

    .projection-stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem 0;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background-color: #e2e8f0;
    }

    .mt-4 { margin-top: 1.5rem; }

    .card {
      background: white;
      border-radius: 1.25rem;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .card-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
    }

    .card-body {
      padding: 1.5rem;
    }

    .hover-lift {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class ProfitRiskComponent implements OnInit {
  TrendingIcon = TrendingUp;
  AlertIcon = AlertTriangle;
  DollarIcon = DollarSign;
  BarChartIcon = BarChart3;
  ShieldIcon = ShieldCheck;

  user: User | undefined;

  constructor(private userDataService: UserDataService) {}

  ngOnInit() {
    this.user = this.userDataService.getUserById('U001');
  }
}

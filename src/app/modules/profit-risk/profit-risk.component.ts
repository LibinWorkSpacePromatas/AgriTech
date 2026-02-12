import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, TrendingUp, AlertTriangle, DollarSign, BarChart3, ShieldCheck } from 'lucide-angular';

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
      
      <div class="metrics-grid">
        <div class="metric-card gold-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="DollarIcon" class="card-icon"></i-lucide>
            <h3>Projected ROI</h3>
          </div>
          <div class="metric-value">
            <span class="value">12.4</span>
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
            <span class="value">Low</span>
          </div>
          <div class="metric-footer">
            <span class="status-indicator status-normal"></span>
            <span>Minimal environmental threat</span>
          </div>
        </div>
        
        <div class="metric-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="AlertIcon" class="card-icon"></i-lucide>
            <h3>Potential Loss</h3>
          </div>
          <div class="metric-value">
            <span class="value">$0.00</span>
          </div>
          <div class="metric-footer">
            <span>No active threats detected</span>
          </div>
        </div>
      </div>
      
      <div class="content-section mt-4">
        <div class="card">
          <div class="card-header">
            <h3>Harvest Yield Projections</h3>
          </div>
          <div class="card-body">
            <div class="projection-stats">
              <div class="stat-item">
                <span class="stat-label">Estimated Tonnage</span>
                <span class="stat-value">4.2 t/ha</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-label">Market Value (Est.)</span>
                <span class="stat-value">$1,250 / ton</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-label">Confidence Level</span>
                <span class="stat-value">92%</span>
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
      gap: 1rem;
    }
    
    .page-icon {
      width: var(--icon-xl);
      height: var(--icon-xl);
      color: var(--primary-green);
    }
    
    .subtitle {
      color: var(--gray-600);
      margin: 0;
    }
    
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .metric-card {
      background: var(--white);
      padding: 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .gold-card {
      border-top: 4px solid #f59e0b;
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--gray-700);
    }
    
    .card-header h3 {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0;
    }
    
    .card-icon {
      width: var(--icon-md);
      height: var(--icon-md);
      color: var(--primary-green);
    }
    
    .metric-value {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }
    
    .value {
      font-size: 2.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }
    
    .unit {
      font-size: 1rem;
      color: var(--gray-500);
      font-weight: 500;
    }
    
    .metric-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--gray-500);
    }
    
    .footer-icon {
      width: var(--icon-sm);
      height: var(--icon-sm);
      color: #10b981;
    }
    
    .projection-stats {
      display: flex;
      justify-content: space-around;
      padding: 1.5rem;
      background: var(--gray-50);
      border-radius: var(--radius-md);
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--gray-500);
      font-weight: 600;
    }
    
    .stat-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--gray-900);
    }
    
    .stat-divider {
      width: 1px;
      background: var(--gray-200);
    }
    
    @media (max-width: 1024px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .projection-stats {
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .stat-divider {
        width: 100%;
        height: 1px;
      }
    }
    
    @media (max-width: 640px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
      
      .value {
        font-size: 1.75rem;
      }
    }
  `]
})
export class ProfitRiskComponent {
  TrendingIcon = TrendingUp;
  AlertIcon = AlertTriangle;
  DollarIcon = DollarSign;
  BarChartIcon = BarChart3;
  ShieldIcon = ShieldCheck;
}

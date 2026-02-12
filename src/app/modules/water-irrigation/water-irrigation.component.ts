import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, Droplet, Waves, Calendar, Activity, AlertCircle } from 'lucide-angular';

@Component({
  selector: 'app-water-irrigation',
  standalone: true,
  imports: [CommonModule, AdelaideTimePipe, LucideAngularModule],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <div class="header-title-section">
          <i-lucide [img]="DropletIcon" class="page-icon"></i-lucide>
          <div>
            <h1>Water & Irrigation</h1>
            <p class="subtitle">Real-time hydration monitoring and irrigation management</p>
          </div>
        </div>
        <div class="status-badge">
          <i-lucide [img]="ActivityIcon" class="status-icon"></i-lucide>
          <span>System Active</span>
        </div>
      </div>
      
      <div class="metrics-grid">
        <div class="metric-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="WavesIcon" class="card-icon"></i-lucide>
            <h3>Current Hydration</h3>
          </div>
          <div class="metric-value">
            <span class="value">64.2</span>
            <span class="unit">%</span>
          </div>
          <div class="metric-footer">
            <span class="status-indicator status-normal"></span>
            <span>Optimal Range</span>
          </div>
        </div>
        
        <div class="metric-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="CalendarIcon" class="card-icon"></i-lucide>
            <h3>Next Schedule</h3>
          </div>
          <div class="metric-value">
            <span class="value">Tomorrow</span>
            <span class="unit">05:00 AM</span>
          </div>
          <div class="metric-footer">
            <span>Duration: 2.5 hours</span>
          </div>
        </div>
        
        <div class="metric-card alert-card hover-lift">
          <div class="card-header">
            <i-lucide [img]="AlertIcon" class="card-icon"></i-lucide>
            <h3>Leak Detection</h3>
          </div>
          <div class="metric-value">
            <span class="value">None</span>
          </div>
          <div class="metric-footer">
            <span>Last sweep: 15m ago</span>
          </div>
        </div>
      </div>
      
      <div class="content-section mt-4">
        <div class="card">
          <div class="card-header">
            <h3>Soil Moisture Breakdown</h3>
          </div>
          <div class="card-body">
            <div class="chart-placeholder">
              <p>Soil Moisture Depth Analysis Chart</p>
              <div class="depth-bar-container">
                <div class="depth-row">
                  <span>30cm</span>
                  <div class="progress-bar"><div class="fill" style="width: 75%"></div></div>
                  <span>75%</span>
                </div>
                <div class="depth-row">
                  <span>60cm</span>
                  <div class="progress-bar"><div class="fill" style="width: 58%"></div></div>
                  <span>58%</span>
                </div>
                <div class="depth-row">
                  <span>90cm</span>
                  <div class="progress-bar"><div class="fill" style="width: 42%"></div></div>
                  <span>42%</span>
                </div>
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
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
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
    
    .status-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: var(--white);
      border-radius: var(--radius-full);
      border: 1px solid var(--gray-200);
      font-size: 0.875rem;
      font-weight: 500;
      color: #059669;
    }
    
    .status-icon {
      width: var(--icon-sm);
      height: var(--icon-sm);
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
    
    .alert-card {
      border-left: 4px solid #10b981;
    }
    
    .chart-placeholder {
      padding: 2rem;
      background: var(--gray-50);
      border-radius: var(--radius-md);
      text-align: center;
      color: var(--gray-500);
    }
    
    .depth-bar-container {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    .depth-row {
      display: grid;
      grid-template-columns: 60px 1fr 60px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    
    .progress-bar {
      height: 12px;
      background: var(--gray-200);
      border-radius: 6px;
      overflow: hidden;
    }
    
    .fill {
      height: 100%;
      background: var(--primary-green);
    }

    @media (max-width: 1024px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1.5rem;
      }
      
      .status-badge {
        width: 100%;
        justify-content: center;
      }
      
      .metrics-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    
    @media (max-width: 640px) {
      .metrics-grid {
        grid-template-columns: 1fr;
      }
      
      .value {
        font-size: 1.75rem;
      }
      
      .depth-row {
        grid-template-columns: 45px 1fr 45px;
        gap: 0.75rem;
        font-size: 0.75rem;
      }
    }
  `]
})
export class WaterIrrigationComponent {
  DropletIcon = Droplet;
  WavesIcon = Waves;
  CalendarIcon = Calendar;
  ActivityIcon = Activity;
  AlertIcon = AlertCircle;
}

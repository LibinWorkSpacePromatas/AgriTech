import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { BlockHeroComponent } from '../../shared/components/block-hero.component';
import { SensorCardComponent } from '../../shared/components/sensor-card.component';
import { LucideAngularModule, Cpu, Sprout } from 'lucide-angular';
import { MOCK_BLOCKS } from '../../shared/constants';
import { Block, SensorReading, HistoricalReading } from '../../shared/models';
import { BlockService } from '../../shared/services/block.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AdelaideTimePipe, BlockHeroComponent, SensorCardComponent, LucideAngularModule],
  template: `
    <div class="dashboard-container fade-in">
      <app-block-hero 
        [block]="currentBlock" 
        [lastReadings]="lastReadings"
      ></app-block-hero>
      
      <div class="section-header">
        <h2 class="section-title">
          <i-lucide [img]="CpuIcon" class="section-icon"></i-lucide>
          IoT Sensor Readings
        </h2>
      </div>
      
      <div class="sensors-grid">
        <app-sensor-card 
          *ngFor="let reading of sensorReadings" 
          [reading]="reading"
        ></app-sensor-card>
      </div>
      
      <div class="nutrient-section">
        <div class="nutrient-card hover-lift">
          <div class="nutrient-header">
            <i-lucide [img]="SproutIcon" class="nutrient-icon"></i-lucide>
            <span class="nutrient-label">Nutrient Index</span>
          </div>
          <div class="nutrient-status">
            <span class="badge badge-high">Low</span>
            <span class="nutrient-text">Nitrogen levels below optimal range</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      animation: fadeIn 0.3s ease-out;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1.5rem;
      margin-top: 2rem;
    }
    
    .section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--gray-900);
      margin: 0;
    }
    
    .section-icon {
      width: var(--icon-lg);
      height: var(--icon-lg);
      color: var(--primary-green);
    }
    
    .section-subtitle {
      font-size: 0.875rem;
      color: var(--gray-500);
    }
    
    .sensors-grid {
      display: grid;
      grid-template-columns: repeat(var(--grid-cols, 5), 1fr);
      gap: 1.25rem;
      margin-bottom: 2rem;
    }
    
    @media (max-width: 1400px) {
      .sensors-grid {
        --grid-cols: 3;
      }
    }
    
    @media (max-width: 1024px) {
      .sensors-grid {
        --grid-cols: 2;
      }
    }
    
    @media (max-width: 640px) {
      .sensors-grid {
        --grid-cols: 1;
      }
    }
    
    .nutrient-section {
      margin-top: 2rem;
    }
    
    .nutrient-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: var(--shadow-md);
    }
    
    .nutrient-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }
    
    .nutrient-icon {
      width: var(--icon-lg);
      height: var(--icon-lg);
      color: var(--primary-green);
    }
    
    .nutrient-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gray-900);
    }
    
    .nutrient-status {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .nutrient-text {
      font-size: 0.875rem;
      color: var(--gray-700);
    }
    
    @media (max-width: 640px) {
      .nutrient-status {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentBlock: Block = MOCK_BLOCKS[0];
  CpuIcon = Cpu;
  SproutIcon = Sprout;
  private destroy$ = new Subject<void>();

  lastReadings: HistoricalReading[] = [
    { period: 'Now', value: '47.4%' },
    { period: '-1h', value: '39.1%' },
    { period: '-2h', value: '39.5%' },
    { period: '-3h', value: '46.1%' },
    { period: '-4h', value: '46.2%' }
  ];

  sensorReadings: SensorReading[] = [
    {
      type: 'soil-moisture',
      label: 'Soil Moisture',
      value: 34.2,
      unit: '%',
      status: 'normal',
      timestamp: new Date(),
      hasHistory: false
    },
    {
      type: 'soil-temperature',
      label: 'Soil Temperature',
      value: 22.8,
      unit: '°C',
      status: 'normal',
      timestamp: new Date(),
      hasHistory: false
    },
    {
      type: 'air-temperature',
      label: 'Air Temperature',
      value: 34.0,
      unit: '°C',
      status: 'normal',
      timestamp: new Date(),
      hasHistory: false
    },
    {
      type: 'humidity',
      label: 'Humidity',
      value: 62.1,
      unit: '%',
      status: 'normal',
      timestamp: new Date(),
      hasHistory: false
    },
    {
      type: 'ph-level',
      label: 'Soil pH',
      value: 6.8,
      unit: 'pH',
      status: 'normal',
      timestamp: new Date(),
      hasHistory: false
    }
  ];

  constructor(private blockService: BlockService) {}

  ngOnInit(): void {
    this.blockService.selectedBlock$
      .pipe(takeUntil(this.destroy$))
      .subscribe(block => {
        if (block) {
          this.currentBlock = block;
          // In a real app, we would fetch new sensor readings for the block here
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

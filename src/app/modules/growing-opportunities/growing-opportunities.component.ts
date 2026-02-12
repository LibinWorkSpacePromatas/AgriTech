import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, Sprout, CheckCircle, Target, Sparkles, Zap } from 'lucide-angular';

@Component({
  selector: 'app-growing-opportunities',
  standalone: true,
  imports: [CommonModule, AdelaideTimePipe, LucideAngularModule],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <div class="header-title-section">
          <i-lucide [img]="SproutIcon" class="page-icon"></i-lucide>
          <div>
            <h1>Growing Opportunities</h1>
            <p class="subtitle">AI-driven management advice and biological optimizations</p>
          </div>
        </div>
      </div>
      
      <div class="recommendations-container">
        <div class="opportunity-card highlight hover-glow">
          <div class="card-icon-container">
            <i-lucide [img]="SparklesIcon" class="large-icon"></i-lucide>
          </div>
          <div class="card-content">
            <div class="card-tag">High Impact</div>
            <h2>Foliar Nutrient Application</h2>
            <p>Based on current Nitrogen levels, a targeted foliar spray in Block A could increase berry sugar content by 8-10%.</p>
            <div class="card-actions">
              <button class="primary-btn">View Treatment Plan</button>
              <button class="secondary-btn">Dismiss</button>
            </div>
          </div>
        </div>
        
        <div class="opportunities-grid">
          <div class="small-card hover-lift">
            <div class="card-header">
              <i-lucide [img]="ZapIcon" class="header-icon"></i-lucide>
              <h3>Irrigation Efficiency</h3>
            </div>
            <p>Opportunity to reduce water usage by 15% in Block C by adjusting nighttime flow.</p>
          </div>
          
          <div class="small-card hover-lift">
            <div class="card-header">
              <i-lucide [img]="TargetIcon" class="header-icon"></i-lucide>
              <h3>Pest Mitigation</h3>
            </div>
            <p>Early warning: Humidity levels in Sector 4 are ideal for Powdery Mildew. Consider preventative check.</p>
          </div>
          
          <div class="small-card hover-lift">
            <div class="card-header">
              <i-lucide [img]="CheckIcon" class="header-icon"></i-lucide>
              <h3>Canopy Management</h3>
            </div>
            <p>Vesting phase complete. Recommended leaf removal for increased sun exposure in Merlot blocks.</p>
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
    
    .recommendations-container {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    
    .opportunity-card {
      background: var(--white);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-md);
      display: flex;
      gap: 2rem;
      border-left: 6px solid var(--primary-green);
    }
    
    .card-icon-container {
      width: 80px;
      height: 80px;
      background: var(--bg-beige);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .large-icon {
      width: var(--icon-xl);
      height: var(--icon-xl);
      color: var(--primary-green);
    }
    
    .card-content {
      flex: 1;
    }
    
    .card-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background: #ecfdf5;
      color: #059669;
      font-size: 0.75rem;
      font-weight: 700;
      border-radius: var(--radius-full);
      margin-bottom: 0.75rem;
      text-transform: uppercase;
    }
    
    .card-content h2 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
      color: var(--gray-900);
    }
    
    .card-content p {
      color: var(--gray-600);
      line-height: 1.6;
      margin-bottom: 1.5rem;
    }
    
    .card-actions {
      display: flex;
      gap: 1rem;
    }
    
    .primary-btn {
      padding: 0.625rem 1.25rem;
      background: var(--primary-green);
      color: var(--white);
      border: none;
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    
    .primary-btn:hover {
      opacity: 0.9;
    }
    
    .secondary-btn {
      padding: 0.625rem 1.25rem;
      background: var(--white);
      color: var(--gray-600);
      border: 1px solid var(--gray-300);
      border-radius: var(--radius-md);
      font-weight: 600;
      cursor: pointer;
    }
    
    .opportunities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    
    .small-card {
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
    }
    
    .header-icon {
      width: var(--icon-md);
      height: var(--icon-md);
      color: var(--primary-green);
    }
    
    .small-card h3 {
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
    }
    
    .small-card p {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0;
      line-height: 1.5;
    }
    
    @media (max-width: 1024px) {
      .page-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .opportunity-card {
        flex-direction: column;
        gap: 1.5rem;
      }
      
      .card-icon-container {
        width: 60px;
        height: 60px;
      }
      
      .large-icon {
        width: 30px;
        height: 30px;
      }
      
      .card-content h2 {
        font-size: 1.25rem;
      }
    }
    
    @media (max-width: 640px) {
      .card-actions {
        flex-direction: column;
      }
      
      .primary-btn, .secondary-btn {
        width: 100%;
        text-align: center;
      }
    }
  `]
})
export class GrowingOpportunitiesComponent {
  SproutIcon = Sprout;
  CheckIcon = CheckCircle;
  TargetIcon = Target;
  SparklesIcon = Sparkles;
  ZapIcon = Zap;
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, MessageCircle, Zap, Maximize2, Bot, Send, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-grower-gpt',
  standalone: true,
  imports: [CommonModule, AdelaideTimePipe, LucideAngularModule],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <div class="header-title-section">
          <i-lucide [img]="BotIcon" class="page-icon"></i-lucide>
          <div>
            <h1>Grower GPT</h1>
            <p class="subtitle">Personalized AI agronomist for block-level biological insights</p>
          </div>
        </div>
      </div>
      
      <div class="gpt-layout">
        <div class="chat-main section">
          <div class="chat-container">
            <div class="message assistant-msg">
              <div class="avatar-circle">
                <i-lucide [img]="BotIcon" class="avatar-icon"></i-lucide>
              </div>
              <div class="message-bubble">
                <p>Hello! I've analyzed **Block A - Shiraz**. Currently, soil moisture is at 34.2%, which is optimal. However, I noticed a slight uptick in local humidity. Would you like a risk assessment for mildew?</p>
                <div class="suggested-actions">
                  <button class="suggest-btn">Generate Risk Report</button>
                  <button class="suggest-btn">View Historical Humidity</button>
                </div>
              </div>
            </div>
            
            <div class="message user-msg">
              <div class="message-bubble">
                <p>Yes, please generate the report and compare it with last year's data for this period.</p>
              </div>
            </div>
          </div>
          
          <div class="chat-input-wrapper">
            <div class="chat-input-box">
              <input type="text" placeholder="Ask Grower GPT anything about your vines..." />
              <button class="send-btn">
                <i-lucide [img]="SendIcon" class="send-icon"></i-lucide>
              </button>
            </div>
          </div>
        </div>
        
        <div class="insights-sidebar section">
          <div class="section-badge">
            <i-lucide [img]="SparklesIcon" class="badge-icon"></i-lucide>
            <span>Auto Insights</span>
          </div>
          <div class="insight-list">
            <div class="insight-item">
              <h4>Water Stress Peak</h4>
              <p>Block C likely to hit critical stress levels by Thursday without intervention.</p>
            </div>
            <div class="insight-item">
              <h4>Optimal Harvest Window</h4>
              <p>Shiraz blocks trending 3 days earlier than projected. New window: March 12-15.</p>
            </div>
            <div class="insight-item">
              <h4>Nutrient Synergy</h4>
              <p>Correlation found between sector 2 irrigation and Nitrogen uptake efficiency.</p>
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
      height: calc(100vh - var(--header-height) - 4rem);
      gap: 1.5rem;
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
    
    .gpt-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 1.5rem;
      flex: 1;
      height: 100%;
    }
    
    .section {
      background: var(--white);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-premium);
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(0,0,0,0.03);
    }
    
    .chat-main {
      padding: 1.5rem;
    }
    
    .chat-container {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      padding: 1rem;
    }
    
    .message {
      display: flex;
      gap: 1rem;
      max-width: 85%;
    }
    
    .assistant-msg {
      align-self: flex-start;
    }
    
    .user-msg {
      align-self: flex-end;
      flex-direction: row-reverse;
    }
    
    .avatar-circle {
      width: 40px;
      height: 40px;
      background: var(--primary-green);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .avatar-icon {
      width: var(--icon-md);
      height: var(--icon-md);
      color: var(--white);
    }
    
    .message-bubble {
      padding: 1rem 1.25rem;
      border-radius: var(--radius-lg);
      line-height: 1.6;
    }
    
    .assistant-msg .message-bubble {
      background: var(--bg-beige);
      color: var(--gray-800);
      border-top-left-radius: 0;
    }
    
    .user-msg .message-bubble {
      background: var(--primary-green);
      color: var(--white);
      border-top-right-radius: 0;
    }
    
    .suggested-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
      margin-top: 1rem;
    }
    
    .suggest-btn {
      padding: 0.5rem 1rem;
      background: var(--white);
      border: 1px solid var(--gray-200);
      border-radius: var(--radius-full);
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--primary-green);
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .suggest-btn:hover {
      background: var(--primary-green);
      color: var(--white);
      border-color: var(--primary-green);
    }
    
    .chat-input-wrapper {
      padding-top: 1.5rem;
      border-top: 1px solid var(--gray-100);
    }
    
    .chat-input-box {
      display: flex;
      gap: 0.75rem;
      background: var(--gray-50);
      padding: 0.5rem 0.5rem 0.5rem 1.25rem;
      border-radius: var(--radius-full);
      border: 1px solid var(--gray-200);
    }
    
    .chat-input-box input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.9375rem;
      color: var(--gray-800);
    }
    
    .send-btn {
      width: 40px;
      height: 40px;
      background: var(--primary-green);
      color: var(--white);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .send-icon {
      width: var(--icon-md);
      height: var(--icon-md);
    }
    
    .insights-sidebar {
      padding: 1.5rem;
    }
    
    .section-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      color: var(--primary-green);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }
    
    .badge-icon {
      width: var(--icon-sm);
      height: var(--icon-sm);
    }
    
    .insight-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    
    .insight-item h4 {
      margin: 0 0 0.5rem 0;
      font-size: 0.875rem;
      font-weight: 600;
      color: var(--gray-900);
    }
    
    .insight-item p {
      margin: 0;
      font-size: 0.8125rem;
      color: var(--gray-600);
      line-height: 1.5;
    }
    
    @media (max-width: 1024px) {
      .page-container {
        height: auto;
        min-height: calc(100vh - var(--header-height) - 2rem);
      }
      
      .page-header {
        margin-bottom: 1rem;
      }

      .gpt-layout {
        grid-template-columns: 1fr;
        height: auto;
      }
      
      .chat-main {
        min-height: 500px;
      }
      
      .insights-sidebar {
        display: none;
      }
    }
    
    @media (max-width: 640px) {
      .message {
        max-width: 95%;
      }
      
      .avatar-circle {
        width: 32px;
        height: 32px;
      }
      
      .avatar-icon {
        width: 16px;
        height: 16px;
      }
      
      .message-bubble {
        padding: 0.75rem 1rem;
        font-size: 0.875rem;
      }
    }
  `]
})
export class GrowerGptComponent {
  BotIcon = Bot;
  SendIcon = Send;
  SparklesIcon = Sparkles;
  MessageIcon = MessageCircle;
}

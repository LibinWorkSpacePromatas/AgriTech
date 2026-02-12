import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Droplet, Waves, Calendar, Activity, AlertCircle } from 'lucide-angular';

@Component({
  selector: 'app-water-irrigation',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './water-irrigation.component.html',
  styleUrl: './water-irrigation.component.css'
})
export class WaterIrrigationComponent {
  DropletIcon = Droplet;
  WavesIcon = Waves;
  CalendarIcon = Calendar;
  ActivityIcon = Activity;
  AlertIcon = AlertCircle;
}
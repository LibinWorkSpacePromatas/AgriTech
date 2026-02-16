import { Injectable } from '@angular/core';
import { Droplets, Thermometer, Wind, Sprout, CloudRain } from 'lucide-angular';

export interface Sensor {
  id: string;
  label: string;
  value: string | number;
  unit: string;
  status: 'Normal' | 'High' | 'Low';
  icon: any;
  history: number[];
  historyLabels: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  private sensors: Sensor[] = [
    {
      id: '1', label: 'Soil Moisture', value: 32.5, unit: '%', status: 'Normal', icon: Droplets,
      history: [45, 42, 38, 35, 32.5],
      historyLabels: ['-4h', '-3h', '-2h', '-1h', 'Now']
    },
    {
      id: '2', label: 'Soil Temperature', value: 20.1, unit: '°C', status: 'Normal', icon: Thermometer,
      history: [18, 18.5, 19, 19.5, 20.1],
      historyLabels: ['-4h', '-3h', '-2h', '-1h', 'Now']
    },
    {
      id: '3', label: 'Air Temperature', value: 31.4, unit: '°C', status: 'High', icon: Wind,
      history: [26, 28, 29.5, 30.8, 31.4],
      historyLabels: ['-4h', '-3h', '-2h', '-1h', 'Now']
    },
    {
      id: '4', label: 'Humidity', value: 38.7, unit: '%', status: 'Normal', icon: CloudRain,
      history: [45, 42, 40, 39, 38.7],
      historyLabels: ['-4h', '-3h', '-2h', '-1h', 'Now']
    },
    {
      id: '5', label: 'pH Level', value: 7.4, unit: '', status: 'Normal', icon: Sprout,
      history: [7.2, 7.3, 7.3, 7.4, 7.4],
      historyLabels: ['-4h', '-3h', '-2h', '-1h', 'Now']
    }
  ];

  constructor() { }

  getSensors(): Sensor[] {
    return this.sensors;
  }

  getSoilMoisture(): number {
    const soil = this.sensors.find(s => s.label === 'Soil Moisture');
    return soil ? Number(soil.value) : 0;
  }

  simulateSensorReadings() {
    this.sensors.forEach(sensor => {
      // Small random fluctuation
      const fluctuation = (Math.random() - 0.5) * 0.5; // +/- 0.25
      let newValue = Number(sensor.value) + fluctuation;

      // Clamp values to realistic ranges
      if (sensor.label === 'Soil Moisture') newValue = Math.max(0, Math.min(100, newValue));
      if (sensor.label === 'Humidity') newValue = Math.max(0, Math.min(100, newValue));

      sensor.value = Number(newValue.toFixed(1));

      // Update history with new value and remove oldest
      sensor.history.push(sensor.value);
      if (sensor.history.length > 5) {
        sensor.history.shift();
      }
      
      // We keep historyLabels static for now as per original implementation
    });
  }
}

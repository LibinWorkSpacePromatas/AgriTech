import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, retry, catchError, tap, shareReplay, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface WeatherData {
  time: Date[];
  temperature: Float32Array;
  humidity: Float32Array;
  et0: Float32Array;
  soilTemp: Float32Array;
  soilMoisture: Float32Array;
  rain: Float32Array;
}

export interface IrrigationRecommendation {
  currentHydration: number;
  irrigationNeeded: number;
  irrigationMessage: string;
  et0Today: number;
  rainToday: number;
  netIrrigation: number;
  status: 'urgent' | 'monitor' | 'saturated';
}

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly CACHE_DURATION = 15 * 60 * 1000; // 15 minutes
  private cache = new Map<string, { data: WeatherData; timestamp: number }>();

  constructor(private http: HttpClient) {}

  isWithinAustralia(lat: number, lon: number): boolean {
    const bounds = environment.irrigation.australiaBounds;
    return (
      lat >= bounds.minLat &&
      lat <= bounds.maxLat &&
      lon >= bounds.minLon &&
      lon <= bounds.maxLon
    );
  }

  getWeather(lat: number = environment.irrigation.defaultLatitude, 
             lon: number = environment.irrigation.defaultLongitude): Observable<WeatherData> {
    
    if (!this.isWithinAustralia(lat, lon)) {
      return throwError(() => new Error('Location must be within Australia.'));
    }

    const cacheKey = `${lat},${lon}`;
    const cached = this.getCachedData(cacheKey);
    
    if (cached) {
      return new Observable(observer => {
        observer.next(cached);
        observer.complete();
      });
    }

    const params = {
      latitude: lat,
      longitude: lon,
      hourly: [
        'temperature_2m',
        'relative_humidity_2m',
        'et0_fao_evapotranspiration',
        'soil_temperature_6cm',
        'soil_moisture_0_to_1cm',
        'precipitation'
      ],
      timezone: 'auto',
    };

    return this.http.get<any>(environment.weatherApi.baseUrl, { params }).pipe(
      retry(environment.weatherApi.retryAttempts),
      map(response => this.transformWeatherData(response)),
      tap(data => this.setCachedData(cacheKey, data)),
      catchError(this.handleError)
    );
  }

  private transformWeatherData(response: any): WeatherData {
    const hourly = response.hourly;
    const utcOffsetSeconds = response.utc_offset_seconds || 0;

    return {
      time: Array.from(
        { length: hourly.time.length },
        (_, i) => new Date((hourly.time[i] + utcOffsetSeconds) * 1000)
      ),
      temperature: new Float32Array(hourly.temperature_2m),
      humidity: new Float32Array(hourly.relative_humidity_2m),
      et0: new Float32Array(hourly.et0_fao_evapotranspiration),
      soilTemp: new Float32Array(hourly.soil_temperature_6cm),
      soilMoisture: new Float32Array(hourly.soil_moisture_0_to_1cm),
      rain: new Float32Array(hourly.precipitation),
    };
  }

  private getCachedData(cacheKey: string): WeatherData | null {
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    this.cache.delete(cacheKey);
    return null;
  }

  private setCachedData(cacheKey: string, data: WeatherData): void {
    this.cache.set(cacheKey, { data, timestamp: Date.now() });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Weather service error';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server error: ${error.status} - ${error.message}`;
    }
    
    console.error('WeatherService Error:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  clearCache(): void {
    this.cache.clear();
  }
}
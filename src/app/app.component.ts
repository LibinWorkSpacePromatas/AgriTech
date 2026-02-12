import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './core/layout/layout.component';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, LayoutComponent, CommonModule],
    template: `
        <app-layout *ngIf="showLayout">
            <router-outlet></router-outlet>
        </app-layout>
        <router-outlet *ngIf="!showLayout"></router-outlet>
    `,
    styles: []
})
export class AppComponent {
    title = 'AgriTech Digital Twin';
    showLayout = true;

    constructor(private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.showLayout = !event.url.includes('/select-user');
            });
    }
}

import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, AlertTriangle, TrendingUp, Info, HelpCircle, ArrowUpRight, ArrowDownRight, Droplets, Lightbulb, BarChart2, DollarSign, PieChart, Globe } from 'lucide-angular';

interface Crop {
    name: string;
    yieldPerHa: number; // tonnes/ha
    pricePerTon: number; // $
    waterMLPerHa: number; // ML/ha
    variableCosts: number; // $/ha
    fixedCosts: number; // $/ha
    volatilityFactor: number; // 0-1
    color: string;
    type: 'core' | 'alternative';
    marginParams?: { // Specific overrides for Net Margin chart to match reference
        revenueAt100: number;
        costsAt100: number;
    };
    // New fields for Matrix
    capitalCost?: number;
    yearsStr?: string;
    riskLevel?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    badges?: Array<{ text: string; type: 'crisis' | 'verified' }>;
}

@Component({
    selector: 'app-profit-risk',
    standalone: true,
    imports: [CommonModule, FormsModule, LucideAngularModule],
    templateUrl: './profit-risk.component.html',
    styleUrls: ['./profit-risk.component.css']
})
export class ProfitRiskComponent {
    // Icons
    readonly AlertTriangle = AlertTriangle;
    readonly TrendingUp = TrendingUp;
    readonly Info = Info;
    readonly HelpCircle = HelpCircle;
    readonly ArrowUpRight = ArrowUpRight;
    readonly ArrowDownRight = ArrowDownRight;
    readonly Droplets = Droplets;
    readonly Lightbulb = Lightbulb;
    readonly BarChart2 = BarChart2;
    readonly DollarSign = DollarSign;
    readonly PieChart = PieChart;
    readonly Globe = Globe;

    // State
    waterAllocation = signal<number>(100); // Default 100% as requested
    showBankruptcyImpact = signal<boolean>(false);
    selectedScenario = signal<'alternative' | 'global'>('alternative');
    selectedCropName = signal<string>('Wine Grapes');
    hoveredSegment = signal<string | null>(null);
    hoveredRevenueCrop = signal<string | null>(null);

    // Constants
    readonly WATER_PRICE_PER_ML = 150; // Assumed temporary value, adjust if needed

    // Data
    crops: Crop[] = [
        {
            name: 'Wine Grapes',
            yieldPerHa: 12,
            pricePerTon: 244,
            waterMLPerHa: 6,
            variableCosts: 2500,
            fixedCosts: 1300,
            volatilityFactor: 0.35,
            color: '#EF4444',
            type: 'core',
            marginParams: { revenueAt100: 6225, costsAt100: 8000 },
            capitalCost: 0,
            yearsStr: 'Ongoing losses',
            riskLevel: 'CRITICAL',
            badges: [{ text: '2024 Crisis', type: 'crisis' }]
        },
        {
            name: 'Olives',
            yieldPerHa: 12,
            pricePerTon: 2678.5, // Adjusted to match Risk Adj Rev $5464 (6428 * 0.85)
            waterMLPerHa: 5,
            variableCosts: 12000,
            fixedCosts: 4000,
            volatilityFactor: 0.15,
            color: '#22C55E',
            type: 'alternative',
            marginParams: { revenueAt100: 45000, costsAt100: 5900 },
            capitalCost: 28500,
            yearsStr: '4-6 years',
            riskLevel: 'LOW',
            badges: [{ text: 'PIRSA', type: 'verified' }]
        },
        {
            name: 'Almonds',
            yieldPerHa: 3.5,
            pricePerTon: 10285,
            waterMLPerHa: 12,
            variableCosts: 18000,
            fixedCosts: 5000,
            volatilityFactor: 0.2,
            color: '#F59E0B',
            type: 'alternative',
            marginParams: { revenueAt100: 30000, costsAt100: 8500 },
            capitalCost: 40000,
            yearsStr: '5 years',
            riskLevel: 'MEDIUM'
        },
        {
            name: 'Citrus',
            yieldPerHa: 45,
            pricePerTon: 2000,
            waterMLPerHa: 9,
            variableCosts: 50000,
            fixedCosts: 13000,
            volatilityFactor: 0.18, // Adjusted
            color: '#3B82F6',
            type: 'alternative',
            marginParams: { revenueAt100: 80000, costsAt100: 17500 },
            capitalCost: 32500,
            yearsStr: '4 years',
            riskLevel: 'LOW'
        },
        {
            name: 'Table Grapes',
            yieldPerHa: 22,
            pricePerTon: 2500,
            waterMLPerHa: 7,
            variableCosts: 30000,
            fixedCosts: 6000,
            volatilityFactor: 0.20, // Adjusted
            color: '#A855F7',
            type: 'alternative',
            marginParams: { revenueAt100: 55000, costsAt100: 22500 },
            capitalCost: 25000,
            yearsStr: '3 years',
            riskLevel: 'LOW'
        }
    ];

    // Computed Values
    cropMetrics = computed(() => {
        const allocation = this.waterAllocation() / 100;

        return this.crops.map(crop => {
            // Logic for Revenue Chart (Standard)
            const effectiveWaterProportion = allocation;
            const adjustedYield = crop.yieldPerHa * effectiveWaterProportion;
            const revenuePerHaStandard = adjustedYield * crop.pricePerTon;
            const revenuePerML = crop.waterMLPerHa > 0 ? revenuePerHaStandard / crop.waterMLPerHa : 0;
            const riskAdjustedRevenuePerML = revenuePerML * (1 - crop.volatilityFactor);

            // Logic for Net Margin Chart (Specific Targets)
            // Revenue scales with allocation, Costs stay fixed
            const marginRevenue = (crop.marginParams?.revenueAt100 || 0) * allocation;
            const marginCosts = crop.marginParams?.costsAt100 || 0;
            const netMarginPerHa = marginRevenue - marginCosts;

            const yearsToProfit = netMarginPerHa > 0 ? Math.ceil(30000 / netMarginPerHa) : 'Ongoing losses';

            return {
                ...crop,
                revenuePerHa: marginRevenue, // Use margin revenue for tooltip
                totalCostsPerHa: marginCosts, // Use margin costs for tooltip
                netMarginPerHa,
                revenuePerML,
                riskAdjustedRevenuePerML,
                yearsToProfit
            };
        });
    });

    riskAdjustedMetrics = computed(() => {
        return this.cropMetrics().filter(c => c.type === 'alternative').sort((a, b) => a.riskAdjustedRevenuePerML - b.riskAdjustedRevenuePerML);
    });

    // Fixed order for Revenue per ML chart (never sorted by value)
    cropMetricsFixedOrder = computed(() => {
        const metrics = this.cropMetrics();
        const order = ['Wine Grapes', 'Almonds', 'Olives', 'Table Grapes', 'Citrus'];
        return order.map(name => metrics.find(c => c.name === name)).filter((c): c is NonNullable<typeof c> => c !== undefined);
    });

    // Selected Crop Metrics for Cost Structure
    selectedCropMetrics = computed(() => {
        const crop = this.cropMetrics().find(c => c.name === this.selectedCropName());
        if (!crop) return null;

        const revenue = crop.revenuePerHa;
        const costs = crop.totalCostsPerHa;
        const margin = crop.netMarginPerHa;
        const capital = crop.capitalCost || 0;
        const isCritical = crop.riskLevel === 'CRITICAL';

        let chartData: any = {};

        if (isCritical) {
            // CRITICAL: 2-segment chart (Revenue vs Costs)
            const totalPie = revenue + costs;
            chartData = {
                costPercentage: totalPie > 0 ? (costs / totalPie) * 100 : 0,
                revenuePercentage: totalPie > 0 ? (revenue / totalPie) * 100 : 0
            };
        } else {
            // NON-CRITICAL: 3-segment chart (Input + Capital + Margin)
            const safeMargin = Math.max(0, margin);
            const totalPie = costs + capital + safeMargin;
            chartData = {
                inputPct: totalPie > 0 ? (costs / totalPie) * 100 : 0,
                capitalPct: totalPie > 0 ? (capital / totalPie) * 100 : 0,
                marginPct: totalPie > 0 ? (safeMargin / totalPie) * 100 : 0
            };
        }

        return {
            name: crop.name,
            revenue,
            costs,
            margin,
            capital,
            color: crop.color,
            isCritical,
            ...chartData
        };
    });

    selectCrop(name: string) {
        this.selectedCropName.set(name);
    }

    readonly WINE_GRAPE_BASELINE = 493.44512195121956;

    wineGrapeMetrics = computed(() => {
        return this.cropMetrics().find(c => c.name === 'Wine Grapes');
    });

    protected readonly Math = Math;

    // Tooltip Helper
    getHoveredPercentage(metrics: any): number {
        if (metrics.isCritical) {
            if (this.hoveredSegment() === 'costs') return metrics.costPercentage;
            if (this.hoveredSegment() === 'revenue') return metrics.revenuePercentage;
        } else {
            if (this.hoveredSegment() === 'input') return metrics.inputPct;
            if (this.hoveredSegment() === 'capital') return metrics.capitalPct;
            if (this.hoveredSegment() === 'margin') return metrics.marginPct;
        }
        return 0;
    }

    getHoveredValue(metrics: any): number {
        if (metrics.isCritical) {
            if (this.hoveredSegment() === 'costs') return metrics.costs;
            if (this.hoveredSegment() === 'revenue') return metrics.revenue;
        } else {
            if (this.hoveredSegment() === 'input') return metrics.costs;
            if (this.hoveredSegment() === 'capital') return metrics.capital;
            if (this.hoveredSegment() === 'margin') return metrics.margin;
        }
        return 0;
    }

    getHoveredLabel(): string {
        if (this.hoveredSegment() === 'costs' || this.hoveredSegment() === 'input') return 'Input Costs';
        if (this.hoveredSegment() === 'revenue') return 'Revenue';
        if (this.hoveredSegment() === 'capital') return 'Capital Investment';
        if (this.hoveredSegment() === 'margin') return 'Net Margin';
        return '';
    }

    // Chart Scaling
    readonly MARGIN_MAX = 80000;
    readonly MARGIN_MIN = -10000;
    readonly MARGIN_RANGE = this.MARGIN_MAX - this.MARGIN_MIN;

    getBarHeightPercentage(value: number): number {
        return (Math.abs(value) / this.MARGIN_RANGE) * 100;
    }

    getZeroLinePosition(): number {
        return (Math.abs(this.MARGIN_MIN) / this.MARGIN_RANGE) * 100;
    }

    isPositive(value: number): boolean {
        return value >= 0;
    }

    // Methods
    getSliderBackground(): string {
        const val = this.waterAllocation();
        const min = 50;
        const max = 100;
        // Calculate percentage of the range (0% at min, 100% at max)
        const percentage = ((val - min) / (max - min)) * 100;

        return `linear-gradient(to right, var(--primary-green) 0%, var(--primary-green) ${percentage}%, var(--gray-200) ${percentage}%, var(--gray-200) 100%)`;
    }

    // Methods
    onAllocationChange(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        this.waterAllocation.set(Number(value));
    }

    // Get bankruptcy-adjusted revenue for tooltip display (only for Wine Grapes)
    getBankruptcyAdjustedRevenue(cropName: string): number {
        const crop = this.cropMetrics().find(c => c.name === cropName);
        if (!crop) return 0;

        if (!this.showBankruptcyImpact()) {
            return crop.revenuePerML;
        }

        // Apply bankruptcy impact ONLY to Wine Grapes (CRITICAL)
        if (crop.riskLevel === 'CRITICAL') {
            return crop.revenuePerML * 0.65; // 35% reduction for crisis crop
        } else {
            return crop.revenuePerML; // No change for other crops
        }
    }

    // Get the revenue value to display on the bar (affected by bankruptcy toggle for Wine Grapes only)
    getDisplayRevenue(crop: any): number {
        if (this.showBankruptcyImpact() && crop.riskLevel === 'CRITICAL') {
            return this.getBankruptcyAdjustedRevenue(crop.name);
        }
        return crop.revenuePerML;
    }

    // Get percentage difference vs Wine Grapes
    getPercentageVsWineGrapes(cropName: string): number {
        const wineGrapes = this.cropMetrics().find(c => c.name === 'Wine Grapes');
        const crop = this.cropMetrics().find(c => c.name === cropName);
        if (!wineGrapes || !crop) return 0;

        const wineGrapesRevenue = this.getDisplayRevenue(wineGrapes);
        const cropRevenue = crop.revenuePerML;

        if (wineGrapesRevenue === 0) return 0;
        return ((cropRevenue - wineGrapesRevenue) / wineGrapesRevenue) * 100;
    }
}

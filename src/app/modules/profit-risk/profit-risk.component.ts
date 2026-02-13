import { Component, computed, signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlockService } from '../../shared/services/block.service';
import { CommonModule } from '@angular/common';
import { AdelaideTimePipe } from '../../shared/pipes/adelaide-time.pipe';
import { LucideAngularModule, TrendingUp, AlertTriangle, DollarSign, BarChart3, ShieldCheck } from 'lucide-angular';
import { UserDataService } from '../../core/services/user-data.service';
import { User } from '../../core/models/user.model';

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
    hoveredCrop = signal<any>(null); // For quadrant tooltip
    selectedQuadrantCrop = signal<any>(null); // For detail modal

    // Constants
    readonly WATER_PRICE_PER_ML = 150; // Assumed temporary value, adjust if needed

    private blockService = inject(BlockService);
    selectedBlock = toSignal(this.blockService.selectedBlock$);

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

    .metric-value {
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }

    .value {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1e293b;
    }

    .unit {
      font-size: 1.25rem;
      font-weight: 600;
      color: #64748b;
    }

    .metric-footer {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .status-normal { background-color: #10b981; }
    .status-warning { background-color: #f59e0b; }

    .projection-stats {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 1rem 0;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .stat-label {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 500;
    }

    .stat-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #1e293b;
    }

    .stat-divider {
      width: 1px;
      height: 40px;
      background-color: #e2e8f0;
    }

    .mt-4 { margin-top: 1.5rem; }

    .card {
      background: white;
      border-radius: 1.25rem;
      border: 1px solid #e2e8f0;
      overflow: hidden;
    }

    .card-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      background: #f8fafc;
    }

    .card-body {
      padding: 1.5rem;
    }

    .hover-lift {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .hover-lift:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
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

    // Quadrant positioning for Global Market Quadrant view
    readonly quadrantCrops = (() => {
        const wineGrapesRevenue = 759;
        return [
            {
                name: 'Almonds',
                icon: '🌰',
                color: '#16A34A',
                quadrantX: 18,
                quadrantY: 22,
                bubbleSize: 90,
                zIndex: 2,
                revenuePerML: 3000,
                percentageVsWine: Math.round(((3000 - wineGrapesRevenue) / wineGrapesRevenue) * 100),
                quadrant: 'Quadrant 1 - OPPORTUNITY',
                badges: [],
                metrics: [
                    'Australia\'s #1 irrigated crop [ABC Feb 2024]',
                    'Stable kernel demand despite water debate',
                    '3 t/ha yield at $10,000/t market price'
                ],
                strategicAction: 'EXPAND PRODUCTION',
                source: 'Hort Innovation Almonds 2024'
            },
            {
                name: 'Citrus (Navel)',
                icon: '🍊',
                color: '#3B82F6',
                quadrantX: 35,
                quadrantY: 20,
                bubbleSize: 90,
                zIndex: 2,
                revenuePerML: 10000,
                percentageVsWine: Math.round(((10000 - wineGrapesRevenue) / wineGrapesRevenue) * 100),
                quadrant: 'Quadrant 1 - OPPORTUNITY',
                badges: [],
                metrics: [
                    'Navel oranges stable export demand',
                    'Reliable premium market despite China issues',
                    '40 t/ha yield at $2,000/t market price'
                ],
                strategicAction: 'MAINTAIN / EXPAND',
                source: 'Citrus Australia 2024'
            },
            {
                name: 'Olives',
                icon: '🫒',
                color: '#16A34A',
                quadrantX: 28,
                quadrantY: 38,
                bubbleSize: 90,
                zIndex: 3,
                revenuePerML: 6429,
                percentageVsWine: Math.round(((6429 - wineGrapesRevenue) / wineGrapesRevenue) * 100),
                quadrant: 'Quadrant 1 - OPPORTUNITY',
                badges: ['✓ PIRSA 2025 VALIDATED'],
                metrics: [
                    'Water: 5-9.5 ML/ha (30% LESS than wine grapes) [PIRSA 2025]',
                    'High-density setup: $28,500/ha uses existing drip irrigation',
                    'Yield: 12-18 t/ha @ $950/t fresh ($3k/t oil equivalent)',
                    'Operating costs: $5,900/ha (30-40% LESS labor than grapes)',
                    'Net profit: +$76k-$121k/ha mature (yr 7+) [PIRSA Financial Model]',
                    '70% of vineyard rows ideal for conversion; 3.6-5m spacing preferred'
                ],
                strategicAction: 'CONVERT 10-20% VINEYARDS - PIRSA PRIORITY PROGRAM',
                source: 'PIRSA/CCW Factsheet 2025',
                hasFactsheet: true
            },
            {
                name: 'Table Grapes',
                icon: '🍇',
                color: '#A855F7',
                quadrantX: 22,
                quadrantY: 35,
                bubbleSize: 90,
                zIndex: 2,
                revenuePerML: 7857,
                percentageVsWine: Math.round(((7857 - wineGrapesRevenue) / wineGrapesRevenue) * 100),
                quadrant: 'Quadrant 1 - OPPORTUNITY',
                badges: [],
                metrics: [
                    'Premium fresh market vs bulk wine glut',
                    'Sunmuscat export demand stable',
                    '22 t/ha yield at $2,500/t market price'
                ],
                strategicAction: 'UPGRADE TO PREMIUM VARIETIES',
                source: 'Australian Table Grapes 2024'
            },
            {
                name: 'Wine Grapes',
                icon: '🍷',
                color: '#EF4444',
                quadrantX: 75,
                quadrantY: 22,
                bubbleSize: 90,
                zIndex: 1,
                revenuePerML: 759,
                percentageVsWine: 0,
                quadrant: 'Quadrant 2 - REDUCE/EXIT',
                badges: [],
                metrics: [
                    '391kt oversupply (WGCSA 2024)',
                    'Shiraz $200/t (below break-even)',
                    'Weak export demand + strong supply'
                ],
                strategicAction: 'REDUCE / EXIT',
                source: 'WGCSA 2024'
            }
        ];
    })();
}

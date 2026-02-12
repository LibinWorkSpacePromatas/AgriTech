import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sprout, ChevronRight, X, ExternalLink } from 'lucide-angular';

interface Opportunity {
    id: string;
    title: string;
    description: string;
    fullDescription: string;
    keyPoints: string[];
    tags: string[];
    source: string;
    sourceUrl: string;
}

@Component({
    selector: 'app-growing-opportunities',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './growing-opportunities.component.html',
    styleUrls: ['./growing-opportunities.component.css']
})
export class GrowingOpportunitiesComponent {
    SproutIcon = Sprout;
    ChevronRightIcon = ChevronRight;
    XIcon = X;
    ExternalLinkIcon = ExternalLink;

    selectedOpportunity: Opportunity | null = null;

    opportunities: Opportunity[] = [
        {
            id: 'olives-lower-water',
            title: 'Olives: A Lower-Water Option for Riverland',
            description: 'Olive cultivation offers Riverland growers a drought-tolerant alternative that thrives in the region\'s warm Mediterranean climate. With water requirements 30-40% lower than wine grapes, olives present an attractive option for growers...',
            fullDescription: 'Olive cultivation offers Riverland growers a drought-tolerant alternative that thrives in the region\'s warm Mediterranean climate. With water requirements 30-40% lower than wine grapes, olives present an attractive option for growers facing water allocation pressures. The trees are also saline-tolerant, making them suitable for areas with marginally brackish irrigation water.',
            keyPoints: [
                'Water use 30-40% lower than grapes',
                'Saline-tolerant varieties available',
                'Mechanised harvesting reduces labour costs',
                'Rising demand for Australian olive oil',
                'Establishment costs recovered within 5-7 years'
            ],
            tags: ['olives', 'diversification', 'water-efficiency'],
            source: 'Primary Industries SA',
            sourceUrl: 'https://pir.sa.gov.au'
        },
        {
            id: 'government-funding',
            title: 'Government Funding to Support Diversification',
            description: 'The South Australian Government and Central Cooperative Winery (CCW) have announced funding initiatives to help Riverland grape growers transition to more from low-value red grape varieties. Grants of up to $50,000 are available for...',
            fullDescription: 'The South Australian Government and Central Cooperative Winery (CCW) have announced funding initiatives to help Riverland grape growers transition away from low-value red grape varieties. Grants of up to $50,000 are available for growers to replant with alternative crops or premium varieties, with additional support for business planning and market research.',
            keyPoints: [
                'Grants up to $50,000 for crop transition',
                'Business planning support available',
                'Market research assistance included',
                'CCW offering vine removal rebates',
                'Applications open until June 2026'
            ],
            tags: ['funding', 'government-support', 'grants'],
            source: 'Government of South Australia',
            sourceUrl: 'https://www.sa.gov.au/topics/business-and-trade/industry-support'
        },
        {
            id: 'alternative-varieties',
            title: 'Alternative Varieties & Premium Markets',
            description: 'Mediterranean grape varieties like Nero d\'Avola, Fiano, and Vermentino are gaining traction in the Riverland, offering growers access to premium markets with being better adapted to warming conditions. These varieties typically...',
            fullDescription: 'Mediterranean grape varieties like Nero d\'Avola, Fiano, and Vermentino are gaining traction in the Riverland, offering growers access to premium markets while being better adapted to warming conditions. These varieties typically command prices 2-3 times higher than bulk Shiraz and have shown strong resilience to heat stress events.',
            keyPoints: [
                'Premium varieties command higher prices',
                'Better adapted to warming climate',
                'Growing consumer interest in alternative varieties',
                'Reduced water stress tolerance',
                'Organic certification opportunities'
            ],
            tags: ['premium-varieties', 'alternative-grapes', 'organic'],
            source: 'Wine Australia',
            sourceUrl: 'https://www.wineaustralia.com/market-insights'
        },
        {
            id: 'almonds-precision-irrigation',
            title: 'Almonds & Precision Irrigation for Drought Resilience',
            description: 'SARDI and the SA Drought Hub have been researching precision irrigation techniques that match water application to actual canopy requirements. For almond growers, this approach has shown 15-20% water savings without yield...',
            fullDescription: 'SARDI and the SA Drought Hub have been researching precision irrigation techniques that match water application to actual canopy requirements. For almond growers, this approach has shown 15-20% water savings without yield reduction. The research also explores deficit irrigation strategies for existing grape blocks during water-scarce years.',
            keyPoints: [
                '15-20% water savings demonstrated',
                'Canopy-matched irrigation techniques',
                'Deficit irrigation strategies for grapes',
                'Soil moisture monitoring integration',
                'Real-time decision support tools'
            ],
            tags: ['almonds', 'precision-irrigation', 'drought-resilience'],
            source: 'SARDI',
            sourceUrl: 'https://pir.sa.gov.au/sardi'
        },
        {
            id: 'multi-crop-strategies',
            title: 'Multi-Crop Strategies Amid Oversupply',
            description: 'Several successful Riverland growers have diversified their operations to include multiple crop types, reducing their exposure to single commodity price fluctuations. Examples include combining citrus with wine grapes, or adding oil...',
            fullDescription: 'Several successful Riverland growers have diversified their operations to include multiple crop types, reducing their exposure to single-commodity price fluctuations. Examples include combining citrus with wine grapes, or adding olive groves to existing vineyard operations. This approach provides multiple income streams and spreads risk across different market cycles.',
            keyPoints: [
                'Diversified income streams reduce risk',
                'Complementary crop timing spreads labour',
                'Shared infrastructure across crops',
                'Market flexibility advantages',
                'Case studies show 30% income stability improvement'
            ],
            tags: ['multi-crop', 'diversification', 'risk-management'],
            source: 'Riverland Wine Industry Development',
            sourceUrl: 'https://www.riverlandwine.com.au'
        }
    ];

    openOpportunity(opportunity: Opportunity): void {
        this.selectedOpportunity = opportunity;
        document.body.classList.add('scroll-lock');
    }

    closeOpportunity(): void {
        this.selectedOpportunity = null;
        document.body.classList.remove('scroll-lock');
    }
}

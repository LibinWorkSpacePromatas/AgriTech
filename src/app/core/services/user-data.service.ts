import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private users: User[] = [
        {
            userId: 'U001',
            userName: 'James Mitchell',
            region: 'Riverland',
            council: 'MID MURRAY COUNCIL',
            farmName: 'Riverbend Vineyards',
            farmLocation: 'Renmark, SA',
            primaryCropName: 'Shiraz',
            primarySoilType: 'Loamy',
            blocks: [
                { lanslu: 'BCPKFB', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Loamy sand over red clay', area: 9, crop: 'Shiraz' },
                { lanslu: 'BCPKFA', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Sandy loam over red clay', area: 6, crop: 'Cabernet Sauvignon' }
            ]
        },
        {
            userId: 'U002',
            userName: 'Sarah Thompson',
            region: 'Barossa Valley',
            council: 'THE BAROSSA COUNCIL',
            farmName: 'Barossa Estate',
            farmLocation: 'Tanunda, SA',
            primaryCropName: 'Grenache',
            primarySoilType: 'Clay',
            blocks: [
                { lanslu: 'WOGJLp', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Loam over red clay', area: 9, crop: 'Grenache' },
                { lanslu: 'BCPKKE', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Gradational sandy loam', area: 8, crop: 'Shiraz' }
            ]
        },
        {
            userId: 'U003',
            userName: 'Michael Chen',
            region: 'McLaren Vale',
            council: 'CITY OF ONKAPARINGA',
            farmName: 'McLaren Vineyards',
            farmLocation: 'Willunga, SA',
            primaryCropName: 'Cabernet Sauvignon',
            primarySoilType: 'Sandy',
            blocks: [
                { lanslu: 'EUVKFU', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Sand over clay', area: 8, crop: 'Cabernet Sauvignon' },
                { lanslu: 'EUVJLU', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Hard loam over red clay', area: 9, crop: 'Merlot' }
            ]
        },
        {
            userId: 'U004',
            userName: 'Emma Williams',
            region: 'Riverland',
            council: 'MID MURRAY COUNCIL',
            farmName: 'Sunridge Estate',
            farmLocation: 'Waikerie, SA',
            primaryCropName: 'Chardonnay',
            primarySoilType: 'Loamy',
            blocks: [
                { lanslu: 'EUVJLU', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Loam over red clay', area: 7, crop: 'Chardonnay' },
                { lanslu: 'EUVJLp', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Gradational clay loam', area: 10, crop: 'Pinot Grigio' }
            ]
        },
        {
            userId: 'U005',
            userName: 'David Anderson',
            region: 'Barossa Valley',
            council: 'THE BAROSSA COUNCIL',
            farmName: 'Heritage Wines',
            farmLocation: 'Nuriootpa, SA',
            primaryCropName: 'Riesling',
            primarySoilType: 'Silty',
            blocks: [
                { lanslu: 'BCPKFI', soilSubgroup: 'A4', primarySoilClass: 'A4', description: 'Silty loam over clay', area: 7, crop: 'Riesling' },
                { lanslu: 'EUVKFB', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Fine sandy loam', area: 8, crop: 'Semillon' }
            ]
        }
    ];

    constructor() { }

    getUsers(): User[] {
        return this.users;
    }

    getUserById(userId: string): User | undefined {
        return this.users.find(user => user.userId === userId);
    }
}

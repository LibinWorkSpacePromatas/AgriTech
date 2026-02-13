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
                { lanslu: 'BCPKFB', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Loamy sand over red clay', area: 8.5, crop: 'Shiraz', latitude: -34.171, longitude: 140.738 }, // Angove's Winery, Renmark
                { lanslu: 'BCPKFA', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Sandy loam over red clay', area: 6.2, crop: 'Cabernet Sauvignon', latitude: -34.200, longitude: 140.745 } // Mallee Estate, Renmark Ave
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
                { lanslu: 'WOGJLp', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Loam over red clay', area: 9.1, crop: 'Grenache', latitude: -34.524, longitude: 138.963 }, // Château Tanunda, Tanunda
                { lanslu: 'BCPKKE', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Gradational sandy loam', area: 7.8, crop: 'Shiraz', latitude: -34.536, longitude: 138.985 } // Yalumba, Angaston
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
                { lanslu: 'EUVKFU', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Sand over clay', area: 7.5, crop: 'Cabernet Sauvignon', latitude: -35.219, longitude: 138.547 }, // d'Arenberg, McLaren Vale
                { lanslu: 'EUVJLU', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Hard loam over red clay', area: 8.9, crop: 'Merlot', latitude: -35.225, longitude: 138.553 } // Willunga area
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
                { lanslu: 'EUVJLU', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Loam over red clay', area: 6.8, crop: 'Chardonnay', latitude: -34.178, longitude: 139.987 }, // Waikerie area, Riverland
                { lanslu: 'EUVJLp', soilSubgroup: 'D4', primarySoilClass: 'D4', description: 'Gradational clay loam', area: 9.5, crop: 'Pinot Grigio', latitude: -34.185, longitude: 139.995 } // Near Waikerie
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
                { lanslu: 'BCPKFI', soilSubgroup: 'A4', primarySoilClass: 'A4', description: 'Silty loam over clay', area: 7.2, crop: 'Riesling', latitude: -34.536, longitude: 138.985 }, // Penfolds, Nuriootpa
                { lanslu: 'EUVKFB', soilSubgroup: 'A6', primarySoilClass: 'A6', description: 'Fine sandy loam', area: 8.1, crop: 'Semillon', latitude: -34.542, longitude: 138.993 } // Wolf Blass, Nuriootpa
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

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
            farmName: 'Riverbend Vineyards',
            farmLocation: 'Renmark, SA',
            primaryCropName: 'Shiraz',
            primarySoilType: 'Loamy'
        },
        {
            userId: 'U002',
            userName: 'Sarah Thompson',
            region: 'Barossa Valley',
            farmName: 'Barossa Estate',
            farmLocation: 'Tanunda, SA',
            primaryCropName: 'Grenache',
            primarySoilType: 'Clay'
        },
        {
            userId: 'U003',
            userName: 'Michael Chen',
            region: 'McLaren Vale',
            farmName: 'McLaren Vineyards',
            farmLocation: 'Willunga, SA',
            primaryCropName: 'Cabernet Sauvignon',
            primarySoilType: 'Sandy'
        },
        {
            userId: 'U004',
            userName: 'Emma Williams',
            region: 'Riverland',
            farmName: 'Sunridge Estate',
            farmLocation: 'Waikerie, SA',
            primaryCropName: 'Chardonnay',
            primarySoilType: 'Loamy'
        },
        {
            userId: 'U005',
            userName: 'David Anderson',
            region: 'Barossa Valley',
            farmName: 'Heritage Wines',
            farmLocation: 'Nuriootpa, SA',
            primaryCropName: 'Riesling',
            primarySoilType: 'Silty'
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

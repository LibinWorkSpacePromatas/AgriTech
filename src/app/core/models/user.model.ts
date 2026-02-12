export interface PrimarySoilType {
    soilCode: string;
    soilDescription: string;
}

export interface UserBlock {
    lanslu: string;
    soilSubgroup: string;
    primarySoilClass: string;
    description: string;
    crop?: string;
    area: number; // in hectares
}

export interface User {
    userId: string;
    userName: string;
    region: string;
    council: string;
    farmName: string;
    farmLocation: string;
    primaryCropName: string;
    primarySoilType: string;
    blocks: UserBlock[];
}

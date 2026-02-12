export interface PrimarySoilType {
    soilCode: string;
    soilDescription: string;
}

export interface User {
    userId: string;
    userName: string;
    region: string;
    farmName: string;
    farmLocation: string;
    primaryCropName: string;
    primarySoilType: string;
}

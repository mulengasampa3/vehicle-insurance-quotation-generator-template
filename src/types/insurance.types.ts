export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    vin: string;
    plateNumber: string;
    color: string;
    bodyType: string; // This might be redundant if you have carBodyType
    fuelType: string;
    carQualityStatus: string;
    carBodyType: string;
    transmission: string;
    driveType: string;
    steeringLocation: string;
    engineSize: string; // Or number, if always numeric
    mileage: number;
    ownerName: string;
    registrationDate: string; // Consider Date type if you parse it
    insuranceProvider: string;
    insuranceExpiry: string; // Consider Date type if you parse it
}
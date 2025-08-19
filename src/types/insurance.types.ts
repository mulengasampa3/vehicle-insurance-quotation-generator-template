// src/types/insurance.types.ts

export interface Quotation {
    quotationId: string;
    customerId: string;
    customerName: string;
    customerEmail: string;
    vehicleId: string;
    vehicleDetails: {
        make: string;
        model: string;
        year: number;
        plateNumber: string;
        vin: string;
        bodyType: string;
    };
    policyDetails: {
        coverageType: string;
        startDate: string;
        endDate: string;
        durationMonths: number;
    };
    quotedPrice: {
        currency: string;
        amount: number;
        breakdown: {
            basePremium: number;
            discounts: {
                noClaimBonus: number;
                multiVehicleDiscount: number;
            };
            surcharges: {
                vehicleAgeSurcharge: number;
                engineSizeSurcharge: number;
                customizationSurcharge: number;
            };
            applicableTaxes: number;
        };
        totalAmount: number;
    };
    paymentOptions: {
        option: string;
        price: number;
        installments?: number;
    }[];
    issuingAgent: {
        agentId: string;
        agentName: string;
    };
    quotationDate: string;
    expiryDate: string;
    status: string;
}

export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    price: number;
    status: string;
    condition: string;
    mileage?: number;
}
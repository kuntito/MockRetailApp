import { dummyNames } from "../dummyData/dummyNames";
import { dummyPhoneNumbers } from "../dummyData/dummyPhoneNumbers";
import { dummyPostCodes } from "../dummyData/dummyPostCodes";
import type { CustomerInfo } from "../models/CustomerInfo";

function getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function getRandomCustomer(): CustomerInfo {
    return {
        name: getRandomItem(dummyNames),
        postCode: getRandomItem(dummyPostCodes),
        phoneNumber: getRandomItem(dummyPhoneNumbers),
    };
}
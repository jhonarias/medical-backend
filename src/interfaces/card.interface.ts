export interface Car {
    name: string;
    policy: boolean;
    color: string;
    gas: 'gasoline' | 'electric',
    year: number;
    description: string;
    price: number;
}
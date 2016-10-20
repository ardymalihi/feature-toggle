export interface IFeatureToggle {
    id: number;
    name: string;
    description: string;
    enabled: boolean;
    host: string;
}

export interface IUser {
    host: string;
    isAdmin: boolean;
}

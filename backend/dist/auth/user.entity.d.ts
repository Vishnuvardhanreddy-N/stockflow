import { Organization } from '../organizations/organization.entity';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    organizationId: string;
    organization: Organization;
    createdAt: Date;
}

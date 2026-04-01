import { Organization } from '../organizations/organization.entity';
export declare class OrgSettings {
    id: string;
    organizationId: string;
    organization: Organization;
    lowStockDefault: number;
    updatedAt: Date;
}

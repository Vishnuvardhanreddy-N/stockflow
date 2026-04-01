import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { Organization } from '../organizations/organization.entity';
import { OrgSettings } from '../settings/settings.entity';
import { SignupDto, LoginDto } from './auth.dto';
export declare class AuthService {
    private userRepo;
    private orgRepo;
    private settingsRepo;
    private jwtService;
    constructor(userRepo: Repository<User>, orgRepo: Repository<Organization>, settingsRepo: Repository<OrgSettings>, jwtService: JwtService);
    signup(dto: SignupDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            orgId: string;
            orgName: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            orgId: string;
            orgName: string;
        };
    }>;
    private makeToken;
}

import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
}

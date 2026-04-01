import { AuthService } from './auth.service';
import { SignupDto, LoginDto } from './auth.dto';
export declare class AuthController {
    private authService;
    private logger;
    constructor(authService: AuthService);
    signup(res: any, dto: SignupDto): Promise<void>;
    login(res: any, dto: LoginDto): Promise<void>;
}

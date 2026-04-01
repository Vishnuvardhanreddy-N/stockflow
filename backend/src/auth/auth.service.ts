import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { Organization } from '../organizations/organization.entity';
import { OrgSettings } from '../settings/settings.entity';
import { SignupDto, LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Organization) private orgRepo: Repository<Organization>,
    @InjectRepository(OrgSettings) private settingsRepo: Repository<OrgSettings>,
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignupDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (exists) throw new ConflictException('Email already registered');

    const org = this.orgRepo.create({ name: dto.orgName });
    await this.orgRepo.save(org);

    // seed default settings for org
    const settings = this.settingsRepo.create({ organizationId: org.id, lowStockDefault: 5 });
    await this.settingsRepo.save(settings);

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ email: dto.email, passwordHash, organizationId: org.id });
    await this.userRepo.save(user);

    return this.makeToken(user, org);
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { email: dto.email },
      relations: ['organization'],
    });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return this.makeToken(user, user.organization);
  }

  private makeToken(user: User, org: Organization | { id: string; name: string }) {
    const payload = { sub: user.id, orgId: org.id, orgName: org.name, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, orgId: org.id, orgName: org.name },
    };
  }
}

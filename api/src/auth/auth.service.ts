import { Injectable, NotAcceptableException } from '@nestjs/common';
import { AuthTokens, LoginDto, SignupDto } from '../types';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/utils/utils.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  private prisma: PrismaService;
  private utils: UtilsService;
  constructor() {
    this.prisma = new PrismaService();
    this.utils = new UtilsService();
  }
  async signup(signupDto: SignupDto): Promise<AuthTokens> {
    const transactionMeter: { transacted: boolean; userId: string | null } = {
      transacted: false,
      userId: null,
    };

    const transactionProxy = new Proxy(transactionMeter, {
      get: (prop, value) => {
        return Reflect.get(prop, value);
      },
      set: (prop, value, newValue) => {
        return Reflect.set(prop, value, newValue);
      },
    });

    try {
      if (
        await this.prisma.user.findFirst({
          where: {
            OR: [{ username: signupDto.username }, { email: signupDto.email }],
          },
        })
      ) {
        throw new NotAcceptableException('User already exists');
      }
      const user = await this.prisma.user.create({
        data: {
          username: signupDto.username,
          email: signupDto.email,
          password: await this.hash(signupDto.password),
          refreshToken: '',
        },
      });
      transactionProxy.transacted = true;
      transactionProxy.userId = user.id;
      const tokens = this.utils.generateTokens({
        id: user.id,
        username: user.username,
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });
      return tokens;
    } catch (err: any) {
      if (err instanceof PrismaClientKnownRequestError) console.log(err);
      if (transactionProxy.transacted) {
        await this.prisma.user.delete({
          where: { id: transactionProxy.userId },
        });
      }
      console.log(err);
      console.log(process.env.JWT_SECRET);
      throw new NotAcceptableException(err.message);
    }
  }

  async login(loginDto: LoginDto): Promise<AuthTokens> {
    const { email, password } = loginDto;
    if (!email || !password)
      throw new NotAcceptableException('No required credentials');
    const user = await this.prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });
    if (!user) throw new NotAcceptableException('Invalid credentials');

    if (!(await compare(loginDto.password, user.password)))
      throw new NotAcceptableException('Invalid credentials');

    const tokens = this.utils.generateTokens({
      id: user.id,
      username: user.username,
    });
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });
    return tokens;
  }

  async deleleAccount(
    id: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!user) throw new NotAcceptableException('Invalid credentials');
    await this.prisma.user.delete({
      where: { id: id },
    });
    return { success: true, message: 'Account deleted' };
  }

  private async hash(password: string): Promise<string> {
    const hashed = await hash(password, 10);
    return hashed;
  }
}

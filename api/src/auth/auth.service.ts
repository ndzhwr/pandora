import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { AuthTokens, JwtPayload, LoginDto, SignupDto } from '../types';
import { hash, compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { config } from 'dotenv';
config();


@Injectable()
export class AuthService {
  private prisma: PrismaService;
  private utils: UtilsService;
  private jwtService: JwtService
  constructor() {
    this.prisma = new PrismaService();
    this.utils = new UtilsService();
    this.jwtService = new JwtService();
  }
  async signup(signupDto: SignupDto): Promise<any> {
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
        select: {
          id: true,
          username: true,
          email: true,
          profile: {
            select: {
              profilePicture: true,
              bio: true,
              status: true,
            },
          },
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
      return {
        status: 200,
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
        user: user,
      };
    } catch (err: any) {
      console.log(err);
      if (err instanceof PrismaClientKnownRequestError) console.log(err);
      if (transactionProxy.transacted) {
        await this.prisma.user.delete({
          where: { id: transactionProxy.userId },
        });
      }
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
    if (!(await this.prisma.user.findUnique({ where: { id } })))
      throw new NotFoundException("Sorry, we couldn't find that user");
    await this.prisma.user.delete({
      where: { id: id },
    });
    return { success: true, message: 'Account deleted' };
  }


  async logout(userId: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: userId
        },
        data: {
          refreshToken: ""
        }
      })

      if (!user) throw new NotFoundException('User not found')
      return {
        success: true,
        message: 'User logout successful'
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      const data = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
      if (!data) throw new NotAcceptableException("Invalid credentials")
      const user = await this.prisma.user.findUnique({
        where: {
          id: data.id
        }
      })
      if (!user) throw new NotFoundException("User doesn't exist")
      const tokens = this.utils.generateTokens({
        id: user.id,
        username: user.username
      })
      await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          refreshToken: tokens.refreshToken
        }
      })
      return {
        status: 200,
        message: "token refreshed successfully",
        tokens
      }
    } catch (err: any) {
      throw new NotAcceptableException("Internal server error")
    }
  }

  private async hash(password: string): Promise<string> {
    const hashed = await hash(password, 10);
    return hashed;
  }
}



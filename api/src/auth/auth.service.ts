import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
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
        tokens: {
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        },
        user: user,
      };
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
    if (!(await this.prisma.user.findUnique({ where: { id } })))
      throw new NotFoundException("Sorry, we couldn't find that user");
    await this.prisma.user.delete({
      where: { id: id },
    });
    return { success: true, message: 'Account deleted' };
  }


  async logout(userId : string){
    try {
      const user = await this.prisma.user.update({
        where : {
          id :  userId
        },
        data : {
          refreshToken : ""
        }
      })

      if(!user) throw new NotFoundException('User not found')
      return {
        success: true ,
        message : 'User logout successful'
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  private async hash(password: string): Promise<string> {
    console.log(password);

    const hashed = await hash(password, 10);
    return hashed;
  }
}

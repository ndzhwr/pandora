/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { JwtPayload } from 'src/types';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  use(req: Request, res: Response, next: () => void) {
    if (
      !req.headers['authorization'] ||
      req.headers['authorization'].includes(' ') == false
    )
      return res.status(401).json({ message: 'Unauthorized' });

    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
      const data = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });
      req.user = data;
    } catch (err) {
      return res.status(401).json({ message: err });
    }
    next();
  }
}

import * as morgan from 'morgan';
import { Logger, NestMiddleware } from '@nestjs/common';

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    this.resolve();
    throw new Error('Method not implemented.');
  }
  private readonly logger = new Logger('HTTP');

  public resolve() {
    return (req: any, res: any, next: any) => {
      morgan('dev', {
        stream: {
          write: (message) => this.logger.log(message.trim()),
        },
      })(req, res, next);
    };
  }
}

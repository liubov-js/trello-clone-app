import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.params.userId;

    try {
      const authHeader = request.headers.authorization;
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User not authorized' });
      }

      const user = this.jwtService.verify(token);

      if (Number(userId) === user.id) {
        request.user = user;
        return true;
      }

      throw new UnauthorizedException({ message: 'User not authorized' });
    } catch (e) {
      throw new UnauthorizedException({ message: 'User not authorized' });
    }
  }
}

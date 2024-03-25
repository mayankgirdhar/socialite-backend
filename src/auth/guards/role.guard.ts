import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Roles } from '../../constant'; // Import JwtService if using JWT for token verification

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const token = this.extractTokenFromHeader(req.headers.authorization);
    if (!token) {
      return false;
    }

    // Verify and decode the token to get user information
    const decodedToken = this.jwtService.decode(token);

    // Check if user is defined and has roles
    if (!decodedToken || !decodedToken.role) {
      return false;
    }

    return decodedToken.role === Roles.ADMIN;
  }

  private extractTokenFromHeader(authHeader: string): string | null {
    if (!authHeader) {
      return null;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null;
    }

    return parts[1];
  }
}

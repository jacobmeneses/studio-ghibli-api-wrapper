import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
    if ( err || !user ) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export const authJWTByRoles = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err: any, user: any) => {
      if ( err || !user ) {
          return res.status(401).json({ message: 'Unauthorized' });
      }

      const role = user.role;

      if ( !roles.includes(role) ) {
        return res.status(403).json({ message: 'Forbidden' });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

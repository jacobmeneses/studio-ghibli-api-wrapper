const development_str = 'development';

export const NODE_ENV = process.env.NODE_ENV || development_str;
export const isDevEnv = NODE_ENV === development_str;
export const DefaultApiPort = 3000;
export const JwtExpiresIn = process.env.JWT_TOKEN_EXPIRATION || '1h';
export const JwtSecret = process.env.JWT_SECRET || '';
export const AdminRole = 'ADMIN';
export const GhibliApiUrl = 'https://ghibliapi.vercel.app';
export const GhibliRoles = [ 'FILMS', 'PEOPLE', 'LOCATIONS', 'SPECIES', 'VEHICLES' ];

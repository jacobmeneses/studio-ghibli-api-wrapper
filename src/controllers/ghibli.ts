import { Router, Request } from 'express';
import { authJWTByRoles } from '../middleware/auth';
const { GhibliApiUrl, GhibliRoles } = require('../constants');

export const router = Router();

router.get('/', authJWTByRoles(GhibliRoles), async (req, res) => {
  if ( !req.user ) {
    res.status(401).send({ message: 'Unauthorized' });
    return;
  }

  const role = req.user.role.toLowerCase();
  const fullUrl = req.originalUrl;
  const queryString = fullUrl.includes('?') ? fullUrl.split('?')[1] : '';

  const r = await fetch(`${GhibliApiUrl}/${role}?${queryString}`);
  const data = await r.json();

  res.status(r.status).send(data);
});

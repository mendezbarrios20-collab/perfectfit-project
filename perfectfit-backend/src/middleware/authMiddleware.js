import { randomBytes } from 'node:crypto';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const activeSessions = new Map();

export const crearSesion = () => {
  const token = randomBytes(32).toString('hex');
  activeSessions.set(token, Date.now() + SESSION_DURATION_MS);
  return token;
};

export const revocarSesion = (token) => {
  activeSessions.delete(token);
};

export const autenticarToken = (req, res, next) => {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  const expiration = token && activeSessions.get(token);

  if (scheme !== 'Bearer' || !expiration) {
    return res.status(401).json({ success: false, error: 'Se requiere una sesión válida.' });
  }

  if (expiration <= Date.now()) {
    revocarSesion(token);
    return res.status(401).json({ success: false, error: 'La sesión expiró. Inicia sesión nuevamente.' });
  }

  req.authToken = token;
  next();
};

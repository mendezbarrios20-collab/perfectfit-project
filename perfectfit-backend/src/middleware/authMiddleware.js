import { randomBytes } from 'node:crypto';

const SESSION_DURATION_MS = 8 * 60 * 60 * 1000;
const activeSessions = new Map();

export const crearSesion = (role) => {
  const token = randomBytes(32).toString('hex');
  activeSessions.set(token, {
    expiresAt: Date.now() + SESSION_DURATION_MS,
    role
  });
  return token;
};

export const revocarSesion = (token) => {
  activeSessions.delete(token);
};

export const autenticarToken = (req, res, next) => {
  const authorization = req.get('authorization') || '';
  const [scheme, token] = authorization.split(' ');
  const session = token && activeSessions.get(token);

  if (scheme !== 'Bearer' || !session) {
    return res.status(401).json({ success: false, error: 'Se requiere una sesión válida.' });
  }

  if (session.expiresAt <= Date.now()) {
    revocarSesion(token);
    return res.status(401).json({ success: false, error: 'La sesión expiró. Inicia sesión nuevamente.' });
  }

  req.authToken = token;
  req.authRole = session.role;
  next();
};

export const autorizarAdmin = (req, res, next) => {
  if (req.authRole !== 'admin') {
    return res.status(403).json({ success: false, error: 'Se requieren permisos de administrador.' });
  }

  next();
};

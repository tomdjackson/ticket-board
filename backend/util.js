import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from './config.js';

export async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

export async function comparePassword(password, hash) { return bcrypt.compare(password, hash); }

export function getToken(user) {
  const token = jwt.sign({ user }, config.secret, {
    expiresIn: 60 * 60 * 24 * 7, // 1 Week
  });

  return token;
}

export function getUser(token) {
  try {
    const user = jwt.verify(token, config.secret);
    return { ...user, loggedIn: true };
  } catch (e) {
    // TODO log error?
    return { loggedIn: false };
  }
}

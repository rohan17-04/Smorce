import { SignJWT, jwtVerify } from 'jose';

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('JWT_SECRET_KEY is not defined in environment variables');
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);

export async function signToken(payload: { id: string; email: string }, expiresIn: string = '4h') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch {
    return null;
  }
}

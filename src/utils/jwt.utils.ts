import jwt, { JwtPayload, VerifyOptions, type SignOptions } from "jsonwebtoken";

const defaultJwtSignOptions: SignOptions = {
  expiresIn: "1h",
  algorithm: "HS256",
};

const defaultJwtVerifyOptions: VerifyOptions = {
  algorithms: ["HS256"],
};

function signToken<T extends Record<string, unknown>>(
  payload: T,
  options?: SignOptions,
): string {
  return jwt.sign(payload, "secret", { ...defaultJwtSignOptions, ...options });
}

function verifyToken<T extends Record<string, unknown>>(
  token: string,
  options?: VerifyOptions,
): (T & JwtPayload) | null {
  try {
    return jwt.verify(token, "secret", {
      ...defaultJwtVerifyOptions,
      ...options,
    }) as T & JwtPayload;
  } catch (error) {
    return null;
  }
}

export { signToken, verifyToken };

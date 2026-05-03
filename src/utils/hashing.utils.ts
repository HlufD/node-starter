import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;

function hashPassword(raw: string): Promise<string> {
  return bcrypt.hash(raw, SALT_ROUNDS);
}

function compareHash(raw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(raw, hash);
}

export {
  hashPassword,
  compareHash,
}

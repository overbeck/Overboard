// Hash = SHA-256(email + password + SALT)
// To generate a hash for a new user, run:
//   node -e "require('crypto').createHash('sha256').update('email@example.com' + 'password' + 'overbeck-overboard-2026').digest('hex')"
// Then add an entry below.

export const SALT = 'overbeck-overboard-2026';

export interface User {
  email: string;
  name: string;
  passwordHash: string;
}

export const users: User[] = [
  {
    email: 'admin@overbeckmusic.com',
    name: 'Admin',
    // Password: Overboard2026!  — change this immediately after first login
    passwordHash: 'c90e98ec4bed922f73923470e6c7204b7957da38da63c71c91a3d0e8e0bd84af',
  },
];

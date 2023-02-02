import { Buffer } from "buffer";

export function isTokenExpired(token: string): boolean {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf-8'));

    const clockTimeStamp = Math.floor(Date.now() / 1000);

    return clockTimeStamp > payload.exp;
}
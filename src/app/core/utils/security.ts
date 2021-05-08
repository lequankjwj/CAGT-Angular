import * as CryptoJS from 'crypto-js';

const keyEncode = 'Zq4t7w!z%C*F-JaNcRfUjXn2r5u8x/A?D(G+KbPeSgVkYp3s6v9y$B&E)H@McQfT';
export class SecurityUtil {
    /**
     * Encrypt key
     * @param text
     */
    static set(text: string) {
        return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text.toString()), keyEncode).toString();
    }

    /**
     * Decrypts key
     * @param text
     * @returns
     */
    static get(text: string) {
        try {
            return CryptoJS.AES.decrypt(text, keyEncode).toString(CryptoJS.enc.Utf8);
        } catch (e) {}
    }
}

import { validateRegex } from './validateRegex';

describe('validateRegex', () => {
    it('should return true for a valid value matching the regex', () => {
        const value = 'abc123';
        const regexString = '[a-z0-9]+';
        const result = validateRegex(value, regexString);
        expect(result).toBeTruthy();
    });

    it('should return false for an invalid value not matching the regex', () => {
        const value = 'ABC';
        const regexString = '[a-z]+';
        const result = validateRegex(value, regexString);
        expect(result).toBeFalsy();
    });

    it('should return false for empty value', () => {
        const value = '';
        const regexString = '[a-z]+';
        const result = validateRegex(value, regexString);
        expect(result).toBeFalsy();
    });

    it('should return false for empty regex string', () => {
        const value = 'abc';
        const regexString = '';
        const result = validateRegex(value, regexString);
        expect(result).toBeFalsy();
    });

    it('should return false for both empty value and regex string', () => {
        const value = '';
        const regexString = '';
        const result = validateRegex(value, regexString);
        expect(result).toBeFalsy();
    });
});

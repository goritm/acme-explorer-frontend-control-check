import { validateTelephoneNumber } from '../telephone-number.validator';
import * as faker from 'faker';

describe('ValidateTelephoneNumber', () => {
  it('should return false given an undefined', () => {
    const res = validateTelephoneNumber(undefined as any);

    expect(res).toEqual(false);
  });

  it('should return false given an null', () => {
    const res = validateTelephoneNumber(null as any);

    expect(res).toEqual(false);
  });

  it('should return false given an empty string', () => {
    const res = validateTelephoneNumber('');

    expect(res).toEqual(false);
  });

  it.each([
    [faker.internet.url()],
    [faker.lorem.word()],
    [faker.lorem.paragraphs(3)]
  ])('should return false given an invalid telephoneNumber = "%s"', (val) => {
    const res = validateTelephoneNumber(val);

    expect(res).toEqual(false);
  });

  it.each([
    [faker.phone.phoneNumberFormat().replace('-', '')],
    [faker.phone.phoneNumberFormat().replace('-', '')]
  ])('should return true given a valid telephoneNumber = "%s"', (val) => {
    const res = validateTelephoneNumber(val);
    expect(res).toEqual(true);
  });
});

/* Phone number check for the diagnostic gate (5 October 2026, Waleed's ask).
   He rings every lead himself and too many numbers were coming through as
   "call failed" or "incorrect number". The old check only counted digits, so
   a UK mobile with a digit missing, a landline typed as a mobile, or a string
   of sevens all passed. This is one layer of fail-proofing with no text
   message and no code: it knows what UK numbers look like, says exactly what
   is wrong in plain words, and stores the number in international form
   (+44...) so it dials correctly from his phone and WhatsApp.

   Accepted: UK mobiles (07xxx xxxxxx, with or without +44 / 0044), UK
   landlines (01, 02, 03), and any international number given with its
   country code (+971..., +1...). Rejected with a specific message: wrong
   digit count, premium 08/09 numbers, runs of the same digit, keyboard
   sequences, and numbers with no country code that are not UK. */

export interface PhoneCheck {
  ok: boolean
  /* International form to store and dial: +447471779503 */
  e164: string
  /* Readable form to echo back: +44 7471 779503 */
  display: string
  /* What to tell them when ok is false */
  error: string
}

const fail = (error: string): PhoneCheck => ({ ok: false, e164: '', display: '', error })

const looksFake = (digits: string) =>
  /(\d)\1{6,}/.test(digits) ||
  /0123456789|1234567890|9876543210|0987654321/.test(digits)

function formatUk(national: string): string {
  /* national = the number without the leading 0 */
  if (national.startsWith('7')) return `+44 ${national.slice(0, 4)} ${national.slice(4)}`
  if (national.startsWith('2')) return `+44 ${national.slice(0, 2)} ${national.slice(2, 6)} ${national.slice(6)}`
  return `+44 ${national.slice(0, 4)} ${national.slice(4)}`
}

function checkUk(national: string): PhoneCheck {
  /* national: UK digits after the leading 0 (or after +44) */
  if (looksFake(national)) return fail("That doesn't look like a real number. Check it and try again.")
  if (national.startsWith('7')) {
    if (national.length !== 10) {
      const typed = national.length + 1
      return fail(
        `UK mobiles have 11 digits (07xxx xxxxxx). Yours has ${typed}, so a digit is ${typed < 11 ? 'missing' : 'extra'}.`
      )
    }
    if (national[1] === '0') return fail("That doesn't look like a UK mobile. Check the number and try again.")
    return { ok: true, e164: `+44${national}`, display: formatUk(national), error: '' }
  }
  if (/^[123]/.test(national)) {
    const okLen = national.startsWith('1') ? [9, 10] : [10]
    if (!okLen.includes(national.length)) {
      return fail(`That landline has ${national.length + 1} digits. UK landlines have ${national.startsWith('1') ? '10 or 11' : '11'}.`)
    }
    return { ok: true, e164: `+44${national}`, display: formatUk(national), error: '' }
  }
  if (/^[89]/.test(national)) return fail('That looks like a premium or business line. A mobile number is best: it is where Dr Waleed rings you.')
  return fail("That doesn't look like a UK number. Outside the UK, start with your country code, like +971 or +1.")
}

export function checkPhone(raw: string): PhoneCheck {
  let s = (raw || '').trim().replace(/[\s().\-‐-―]/g, '')
  if (!s) return fail("Add a phone number: it's where Dr Waleed rings you to go through the plan.")
  if (s.startsWith('00')) s = `+${s.slice(2)}`
  if (!/^\+?\d+$/.test(s)) return fail('Phone numbers can only have digits, with + at the start for a country code.')

  if (s.startsWith('+')) {
    if (s.startsWith('+44')) {
      let national = s.slice(3)
      if (national.startsWith('0')) national = national.slice(1)
      return checkUk(national)
    }
    const digits = s.slice(1)
    if (digits.startsWith('0')) return fail("A country code can't start with 0. Check it and try again.")
    if (digits.length < 8 || digits.length > 15) return fail('That international number has the wrong number of digits. Check it and try again.')
    if (looksFake(digits)) return fail("That doesn't look like a real number. Check it and try again.")
    return { ok: true, e164: `+${digits}`, display: `+${digits}`, error: '' }
  }

  if (s.startsWith('0')) return checkUk(s.slice(1))
  /* No leading 0 and no country code: a UK mobile with the 0 dropped is the
     common case ("7471 779503"); anything else needs its country code. */
  if (s.startsWith('7') && s.length === 10) return checkUk(s)
  return fail('UK numbers start with 0 (07xxx xxxxxx). Outside the UK, start with your country code, like +971 or +1.')
}

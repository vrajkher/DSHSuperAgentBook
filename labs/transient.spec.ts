import { expect, it } from 'vitest'
import { transient } from '../src/executor/dsh.ts'

it('treats an unreachable host as a passing network failure, and a bad request as none', () => {
  expect(transient(Object.assign(new Error('connect EHOSTUNREACH 10.0.0.1:443'), { code: 'EHOSTUNREACH' }))).toBe(true)
  expect(transient({ status: 503 })).toBe(true)
  expect(transient({ status: 400 })).toBe(false)
  expect(transient(new Error('invalid prompt'))).toBe(false)
})

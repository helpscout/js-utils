import maybe from '../src/maybe'
import times from 'lodash.times'
import sinon from 'sinon'
describe('maybe specs', () => {
  it('maybe() executes callback roughly half the time', () => {
    let executedCount = 0
    let skippedCount = 0
    times(100, () => {
      const spy = sinon.spy()
      maybe(spy)
      if (spy.called) {
        executedCount++
      } else {
        skippedCount++
      }
    })
    // Infinitesimal chance they'd get called fewer than 25 times each
    expect(executedCount).toBeGreaterThan(25)
    expect(skippedCount).toBeGreaterThan(25)
  })

  it('maybe() respects the odds passed in as second argument', () => {
    let executedCount = 0
    let skippedCount = 0
    times(100, () => {
      const spy = sinon.spy()
      maybe(spy, 0.95)
      if (spy.called) {
        executedCount++
      } else {
        skippedCount++
      }
    })
    // With 95% on each try, expect method called at least 70% of the time
    expect(executedCount).toBeGreaterThan(70)
    expect(skippedCount).toBeLessThan(30)
  })
})

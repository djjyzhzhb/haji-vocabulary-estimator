import { describe, it, expect } from 'vitest'
import { calculate } from './calculator'
import { DEFAULT_PARAMS } from '../types'

describe('Calculator Engine', () => {
  it('should calculate with default parameters', () => {
    const result = calculate(DEFAULT_PARAMS)
    
    expect(result).toBeDefined()
    expect(result.synchronic).toBeDefined()
    expect(result.primaryExtension).toBeDefined()
    expect(result.secondaryExtension).toBeDefined()
    expect(result.total).toBeGreaterThan(0)
  })

  it('should generate unique IDs', () => {
    const result1 = calculate(DEFAULT_PARAMS)
    const result2 = calculate(DEFAULT_PARAMS)
    
    expect(result1.id).not.toEqual(result2.id)
  })

  it('should have valid timestamp', () => {
    const result = calculate(DEFAULT_PARAMS)
    
    expect(result.timestamp).toBeGreaterThan(0)
  })

  it('should calculate all three layers correctly', () => {
    const result = calculate(DEFAULT_PARAMS)
    
    expect(result.synchronic.total).toBeGreaterThan(0)
    expect(result.primaryExtension.total).toBeGreaterThan(0)
    expect(result.secondaryExtension.total).toBeGreaterThan(0)
  })

  it('should sum correctly to total', () => {
    const result = calculate(DEFAULT_PARAMS)
    
    const manualTotal = 
      result.synchronic.total + 
      result.primaryExtension.total + 
      result.secondaryExtension.total
    
    expect(Math.round(result.total)).toEqual(Math.round(manualTotal))
  })

  it('should handle modified parameters', () => {
    const modifiedParams = {
      ...DEFAULT_PARAMS,
      n: 250,
      k: 5,
    }
    
    const result = calculate(modifiedParams)
    
    expect(result).toBeDefined()
    expect(result.total).toBeGreaterThan(0)
  })
})

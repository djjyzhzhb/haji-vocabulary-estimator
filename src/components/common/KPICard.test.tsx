import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KPICard } from './KPICard'
import { TrendingUp } from 'lucide-react'

describe('KPICard Component', () => {
  it('should render with basic props', () => {
    render(
      <KPICard
        title="测试指标"
        value={1000}
        icon={TrendingUp}
      />
    )
    
    expect(screen.getByText('测试指标')).toBeInTheDocument()
  })

  it('should format short numbers correctly', () => {
    render(
      <KPICard
        title="测试指标"
        value={1500000}
        icon={TrendingUp}
        format="short"
      />
    )
    
    expect(screen.getByText('1.50M')).toBeInTheDocument()
  })

  it('should format K values correctly', () => {
    render(
      <KPICard
        title="测试指标"
        value={1500}
        icon={TrendingUp}
        format="short"
      />
    )
    
    expect(screen.getByText('1.5K')).toBeInTheDocument()
  })

  it('should format percentage values correctly', () => {
    render(
      <KPICard
        title="测试指标"
        value={0.75}
        icon={TrendingUp}
        format="percent"
      />
    )
    
    expect(screen.getByText('75.0%')).toBeInTheDocument()
  })

  it('should render subtitle when provided', () => {
    render(
      <KPICard
        title="测试指标"
        value={1000}
        icon={TrendingUp}
        subtitle="测试副标题"
      />
    )
    
    expect(screen.getByText('测试副标题')).toBeInTheDocument()
  })

  it('should render with different colors', () => {
    render(
      <KPICard
        title="测试指标"
        value={1000}
        icon={TrendingUp}
        color="emerald"
      />
    )
    
    expect(screen.getByText('测试指标')).toBeInTheDocument()
  })
})

import { describe, it, expect } from 'vitest';
import { getConfig, getPortConfig } from '../configs';

describe('getConfig', () => {
  it('base 3-4p has 19 total resources', () => {
    const config = getConfig(false);
    const total = Object.values(config.resources).reduce((a, b) => a + b, 0);
    expect(total).toBe(19);
  });

  it('base 5-6p has 30 total resources', () => {
    const config = getConfig(true);
    const total = Object.values(config.resources).reduce((a, b) => a + b, 0);
    expect(total).toBe(30);
  });

  it('base 3-4p has 18 number tokens', () => {
    expect(getConfig(false).numberTokens).toHaveLength(18);
  });

  it('base 5-6p has 28 number tokens', () => {
    expect(getConfig(true).numberTokens).toHaveLength(28);
  });
});

describe('getPortConfig', () => {
  it('base 3-4p has 9 ports', () => {
    expect(getPortConfig(false)).toHaveLength(9);
  });

  it('base 3-4p has 4 generic + 5 resource ports', () => {
    const ports = getPortConfig(false);
    const generic = ports.filter(p => p.type === 'generic');
    expect(generic).toHaveLength(4);
    expect(ports.length - generic.length).toBe(5);
  });

  it('base 5-6p has 11 ports', () => {
    expect(getPortConfig(true)).toHaveLength(11);
  });

  it('base 5-6p has 6 generic + 5 resource ports', () => {
    const ports = getPortConfig(true);
    const generic = ports.filter(p => p.type === 'generic');
    expect(generic).toHaveLength(6);
    expect(ports.length - generic.length).toBe(5);
  });
});

import { describe, it, expect } from 'vitest';
import {
  compareGameSystems,
  sortGameSystemKeys,
  sortGameSystems,
} from '@/helpers/sortGameSystems';

const systems = [
  { key: 'a5e', name: 'Advanced 5th Edition' },
  { key: '5e-2014', name: '5th Edition 2014' },
  { key: '5e-2024', name: '5th Edition 2024' },
];

describe('sortGameSystems', () => {
  it('orders 2024 and 2014 SRD before others alphabetically by name', () => {
    expect(sortGameSystems(systems).map(system => system.key)).toEqual([
      '5e-2024',
      '5e-2014',
      'a5e',
    ]);
  });

  it('sorts remaining systems alphabetically by name', () => {
    const unsorted = [
      { key: 'zebra', name: 'Zebra System' },
      { key: '5e-2024', name: '5th Edition 2024' },
      { key: 'alpha', name: 'Alpha System' },
    ];
    expect(sortGameSystems(unsorted).map(system => system.key)).toEqual([
      '5e-2024',
      'alpha',
      'zebra',
    ]);
  });
});

describe('sortGameSystemKeys', () => {
  it('sorts keys using name lookup', () => {
    const nameByKey = Object.fromEntries(systems.map(system => [system.key, system.name]));
    expect(sortGameSystemKeys(['a5e', '5e-2014', '5e-2024'], nameByKey)).toEqual([
      '5e-2024',
      '5e-2014',
      'a5e',
    ]);
  });
});

describe('compareGameSystems', () => {
  it('returns zero for equivalent entries', () => {
    expect(compareGameSystems(
      { key: '5e-2014', name: '5th Edition 2014' },
      { key: '5e-2014', name: '5th Edition 2014' },
    )).toBe(0);
  });
});

import { act, renderHook } from '@testing-library/react-hooks';
import useFetchHeroes from '../hooks/useFetchHeroes';
import { wrapper } from '../../../test-utils/testing-library-utils';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Heroes hooks', () => {
  it('should fire useFetchHeroes', async () => {
    const { result, waitFor } = renderHook<any, any>(() => useFetchHeroes());

    expect(result.current.data.data).toHaveLength(2);
  });
});

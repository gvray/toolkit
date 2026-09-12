import { extractListData, normalizeListResponse } from '../src';

describe('adminkit/api', () => {
  describe('normalizeListResponse', () => {
    it('normalizes object shape', () => {
      expect(normalizeListResponse({ items: [{ id: 1 }], total: 10 })).toEqual({
        items: [{ id: 1 }],
        total: 10,
      });
    });

    it('normalizes plain array', () => {
      expect(normalizeListResponse([{ id: 1 }, { id: 2 }])).toEqual({
        items: [{ id: 1 }, { id: 2 }],
        total: 2,
      });
    });

    it('handles null/undefined', () => {
      expect(normalizeListResponse(null)).toEqual({ items: [], total: 0 });
      expect(normalizeListResponse(undefined)).toEqual({ items: [], total: 0 });
    });
  });

  describe('extractListData', () => {
    it('extracts data from response object', () => {
      expect(extractListData({ data: { items: [{ id: 1 }], total: 5 } })).toEqual({
        items: [{ id: 1 }],
        total: 5,
      });
    });

    it('handles missing response', () => {
      expect(extractListData(undefined)).toEqual({ items: [], total: 0 });
    });
  });
});

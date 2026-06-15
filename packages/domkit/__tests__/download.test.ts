import downloadByBase64 from '../src/downloadByBase64';
import downloadByBlob from '../src/downloadByBlob';
import downloadByUrl from '../src/downloadByUrl';

// Setup URL mocks
const mockCreateObjectURL = jest.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = jest.fn();

Object.assign(URL, {
  createObjectURL: mockCreateObjectURL,
  revokeObjectURL: mockRevokeObjectURL,
});

describe('downloadByBase64', () => {
  let mockAnchor: { href: string; download: string; click: jest.Mock };
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    mockAnchor = { href: '', download: '', click: jest.fn() };
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') return mockAnchor as any;
      return document.createElement.call(document, tag);
    });
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('downloads with data URL prefix', () => {
    downloadByBase64('data:image/png;base64,iVBORw0KGgo=', 'image.png');
    expect(mockAnchor.href).toBe('data:image/png;base64,iVBORw0KGgo=');
    expect(mockAnchor.download).toBe('image.png');
    expect(mockAnchor.click).toHaveBeenCalled();
  });

  it('prepends data URL prefix for raw base64', () => {
    downloadByBase64('iVBORw0KGgo=', 'image.png');
    expect(mockAnchor.href).toBe('data:application/octet-stream;base64,iVBORw0KGgo=');
    expect(mockAnchor.click).toHaveBeenCalled();
  });
});

describe('downloadByBlob', () => {
  let mockAnchor: { href: string; download: string; click: jest.Mock };
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    mockAnchor = { href: '', download: '', click: jest.fn() };
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') return mockAnchor as any;
      return document.createElement.call(document, tag);
    });
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('downloads blob with provided filename', () => {
    downloadByBlob('hello,world', 'export.csv');
    expect(mockAnchor.download).toBe('export.csv');
    expect(mockAnchor.click).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:mock-url');
  });

  it('uses default filename when not provided', () => {
    downloadByBlob('data');
    expect(mockAnchor.download).toBe('unknown');
  });
});

describe('downloadByUrl', () => {
  let mockAnchor: { href: string; download: string; dispatchEvent: jest.Mock };
  let createElementSpy: jest.SpyInstance;

  beforeEach(() => {
    mockAnchor = { href: '', download: '', dispatchEvent: jest.fn() };
    createElementSpy = jest.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      if (tag === 'a') return mockAnchor as any;
      return document.createElement.call(document, tag);
    });
    mockCreateObjectURL.mockReturnValue('blob:mock-url');
  });

  afterEach(() => {
    createElementSpy.mockRestore();
    jest.clearAllMocks();
  });

  it('downloads file from URL', () => {
    downloadByUrl('https://example.com/file.pdf');
    expect(mockAnchor.href).toBe('https://example.com/file.pdf');
    expect(mockAnchor.dispatchEvent).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('extracts filename from URL for download attribute', () => {
    downloadByUrl('https://example.com/docs/report.xlsx');
    expect(mockAnchor.download).toBe('report.xlsx');
  });

  it('strips query params from filename', () => {
    downloadByUrl('https://example.com/image.png?token=abc');
    expect(mockAnchor.download).toBe('image.png');
  });
});

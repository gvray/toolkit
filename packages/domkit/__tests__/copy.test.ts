import copyText from '../src/copyText';
import copyLink from '../src/copyLink';
import copyRichText from '../src/copyRichText';
import copyCode from '../src/copyCode';
import copyTable from '../src/copyTable';

const mockWriteText = jest.fn().mockResolvedValue(undefined);
const mockWrite = jest.fn().mockResolvedValue(undefined);

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: mockWriteText, write: mockWrite },
    writable: true,
    configurable: true,
  });
  (global as any).ClipboardItem = jest.fn().mockImplementation((data: any) => ({ data }));
  (global as any).isSecureContext = true;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('copyText', () => {
  it('uses clipboard.writeText when available', async () => {
    const result = await copyText('hello world');
    expect(result).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('hello world');
  });

  it('falls back to execCommand when clipboard not available', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: null,
      writable: true,
      configurable: true,
    });
    // jsdom doesn't implement execCommand, define it
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });
    const result = await copyText('fallback text');
    expect(result).toBe(true);
  });

  it('falls back to execCommand when clipboard throws', async () => {
    mockWriteText.mockRejectedValueOnce(new Error('blocked'));
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn().mockReturnValue(true),
      writable: true,
      configurable: true,
    });
    const result = await copyText('test');
    expect(result).toBe(true);
  });

  it('removes the fallback textarea when copy fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: null,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document, 'execCommand', {
      value: jest.fn(() => {
        throw new Error('copy blocked');
      }),
      writable: true,
      configurable: true,
    });
    const result = await copyText('test');
    expect(result).toBe(false);
    expect(document.querySelector('textarea')).toBeNull();
  });
});

describe('copyLink', () => {
  it('copies url with title', async () => {
    const result = await copyLink('https://example.com', 'Example');
    expect(result).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('Example\nhttps://example.com');
  });

  it('copies url without title', async () => {
    const result = await copyLink('https://example.com');
    expect(result).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('https://example.com');
  });
});

describe('copyRichText', () => {
  it('uses clipboard.write when available', async () => {
    const result = await copyRichText('<b>Hello</b>', 'Hello');
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });

  it('falls back to copyText when clipboard.write unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText, write: null },
      writable: true,
      configurable: true,
    });
    const result = await copyRichText('<b>Hello</b>', 'Hello');
    expect(result).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('Hello');
  });

  it('falls back to copyText when clipboard.write throws', async () => {
    mockWrite.mockRejectedValueOnce(new Error('not supported'));
    const result = await copyRichText('<b>Hello</b>', 'Hello');
    expect(result).toBe(true);
    expect(mockWriteText).toHaveBeenCalledWith('Hello');
  });
});

describe('copyCode', () => {
  it('copies code with language', async () => {
    const result = await copyCode('const x = 1', 'javascript');
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });

  it('escapes copied code HTML and language class', async () => {
    const result = await copyCode('</code><img src=x>', 'js" onclick="bad');
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
    expect(ClipboardItem).toHaveBeenCalled();
    const data = (ClipboardItem as unknown as jest.Mock).mock.calls[0][0];
    const html = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.readAsText(data['text/html']);
    });
    expect(html).toContain('&lt;/code&gt;&lt;img src=x&gt;');
    expect(html).toContain('language-js&quot; onclick=&quot;bad');
  });

  it('copies code without language', async () => {
    const result = await copyCode('const x = 1');
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });
});

describe('copyTable', () => {
  it('copies table with headers', async () => {
    const result = await copyTable([
      ['Name', 'Age'],
      ['Alice', '30'],
    ]);
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });

  it('copies table without headers', async () => {
    const result = await copyTable([['Alice', '30']], { header: false });
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });

  it('uses custom delimiter', async () => {
    const result = await copyTable([['a', 'b']], { delimiter: ',' });
    expect(result).toBe(true);
    expect(mockWrite).toHaveBeenCalled();
  });
});

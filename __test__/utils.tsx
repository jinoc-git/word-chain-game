import { cookies } from 'next/headers';
import { useParams, usePathname } from 'next/navigation';

export const mockingPathname = (pathname: string) => {
  vi.mocked(usePathname).mockReturnValue(pathname);
};

export const mockingParams = (params: Record<string, string>) => {
  vi.mocked(useParams).mockReturnValue(params);
};

export const mockingCookies = (value: string) => {
  vi.mocked(cookies).mockReturnValue({
    get: vi.fn().mockReturnValue({ value }),
  } as any);
};

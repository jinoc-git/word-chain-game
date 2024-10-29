import '@testing-library/jest-dom';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
    replace: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  }),
  useParams: vi.fn(),
}));

vi.mock('@/utils/createRoomId', () => ({
  createRoomId: vi.fn(() => 'ABCDEF'),
}));

vi.mock('@/hooks/useWord', () => ({
  isValidWord: true,
  enterWordAndCheck: vi.fn().mockReturnValue(true),
}));

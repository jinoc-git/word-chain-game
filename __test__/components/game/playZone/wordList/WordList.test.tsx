import { render, screen } from '@testing-library/react';
import { afterAll } from 'vitest';

import WordList from '@/components/game/playZone/wordList/WordList';
import { createMockSocket, deleteMockSocket, type MockSocket } from '__test__/utils';

const mockWords = ['대나무', '무다리', '리어카'];

describe('WordList', () => {
  const mockSocket: MockSocket = {
    io: null,
    serverSocket: null,
    clientSocket: null,
  };

  beforeAll(async () => {
    await createMockSocket(mockSocket);
  });

  afterAll(() => {
    vi.clearAllMocks();

    deleteMockSocket(mockSocket);
  });

  it.each(mockWords)('should render enterd word', (word) => {
    render(<WordList />);

    expect(screen.getByText(word)).toBeInTheDocument();
  });

  it('should render purple background color last word', () => {
    render(<WordList />);

    const words = screen.getAllByRole('listitem');
    const lastWord = words[words.length - 1];

    expect(lastWord).toHaveClass('bg-secondary');
  });
});

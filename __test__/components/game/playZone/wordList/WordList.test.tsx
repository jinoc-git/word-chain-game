import { render, screen } from '@testing-library/react';

import WordList, { mockWords } from '@/components/game/playZone/wordList/WordList';

describe('WordList', () => {
  it.each(mockWords)('shoul render word list', (word) => {
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

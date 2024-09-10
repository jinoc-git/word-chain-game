import { render, screen } from '@testing-library/react';

import WordList, { mockWords } from '@/components/game/playZone/wordList/WordList';

describe('WordList', () => {
  it.each(mockWords)('shoul render word list', (word) => {
    render(<WordList />);

    expect(screen.getByText(word)).toBeInTheDocument();
  });

  it('should render purple background color 3rd word', () => {
    render(<WordList />);

    const thirdWord = screen.getAllByRole('listitem')[2];
    expect(thirdWord).toHaveClass('bg-secondary');
  });
});

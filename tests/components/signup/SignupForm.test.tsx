import { render, screen } from '@testing-library/react';

import SignupForm from '@/components/signup/signupForm/SignupForm';

describe('SignupForm', () => {
  const renderComponent = () => {
    render(<SignupForm />);

    const getInputs = () => {
      const eamilInput = screen.getByPlaceholderText(/이메일을 입력해 주세요/i);
      const passwordInput = screen.getByPlaceholderText(/비밀번호를 입력해 주세요/i);
      const confirmPasswordInput = screen.getByPlaceholderText(/비밀번호를 다시 입력해 주세요/i);
      return { eamilInput, passwordInput, confirmPasswordInput };
    };

    return {
      getInputs,
    };
  };

  it('should', () => {
    const { getInputs } = renderComponent();
  });
});

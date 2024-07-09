import { render, screen } from '@testing-library/react';
import { SignUpThanks } from '.';

describe('reading_records/_components/organisms/SignUpInput', () => {
  it('フォームが表示されること', () => {
    render(<SignUpThanks />);

    expect(screen.getByText('会員登録が完了しました。')).toBeInTheDocument();
  });
});

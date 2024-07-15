import { render, screen } from '@testing-library/react';
import { SignUpBaseLayout } from '.';

describe('(auth)/_components/organisms/SignUpBaseLayout', () => {
  it('フェーズが表示されること', () => {
    render(
      <SignUpBaseLayout phase='form'>
        <div>test</div>
      </SignUpBaseLayout>,
    );

    expect(screen.getByText('登録情報の入力')).toBeInTheDocument();
    expect(screen.getByText('登録情報の確認')).toBeInTheDocument();
    expect(screen.getByText('登録完了')).toBeInTheDocument();
  });

  it('子要素が表示されること', () => {
    render(
      <SignUpBaseLayout phase='form'>
        <div>test</div>
      </SignUpBaseLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

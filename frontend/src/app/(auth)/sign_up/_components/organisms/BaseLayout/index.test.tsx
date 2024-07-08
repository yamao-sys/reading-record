import { render, screen } from '@testing-library/react';
import { BaseLayout } from '.';

describe('reading_records/_components/organisms/BaseLayout', () => {
  it('フェーズが表示されること', () => {
    render(
      <BaseLayout phase='form'>
        <div>test</div>
      </BaseLayout>,
    );

    expect(screen.getByText('登録情報の入力')).toBeInTheDocument();
    expect(screen.getByText('登録情報の確認')).toBeInTheDocument();
    expect(screen.getByText('登録完了')).toBeInTheDocument();
  });

  it('子要素が表示されること', () => {
    render(
      <BaseLayout phase='form'>
        <div>test</div>
      </BaseLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

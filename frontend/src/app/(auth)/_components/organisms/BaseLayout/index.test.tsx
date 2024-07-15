import { render, screen } from '@testing-library/react';
import { BaseLayout } from '.';

describe('(auth)/_components/organisms/BaseLayout', () => {
  it('子要素が表示されること', () => {
    render(
      <BaseLayout>
        <div>test</div>
      </BaseLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

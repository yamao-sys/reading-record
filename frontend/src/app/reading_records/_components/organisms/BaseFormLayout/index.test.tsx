import { render, screen } from '@testing-library/react';
import { BaseFormLayout } from '.';

describe('reading_records/_components/organisms/BaseFormLayout', () => {
  it('子要素が表示されること', () => {
    render(
      <BaseFormLayout>
        <div>test</div>
      </BaseFormLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });

  it('任意項目のPropsが渡せること', () => {
    render(
      <BaseFormLayout additionalStyle='z-10'>
        <div>test</div>
      </BaseFormLayout>,
    );

    expect(screen.getByText('test')).toBeInTheDocument();
  });
});

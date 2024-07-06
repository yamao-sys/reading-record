import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReadingRecordEdit from '.';
import { ReadingRecordDto } from '@/api/reading_records/@types';
import * as UpdateReadingRecord from '@/app/reading_records/_actions/updateReadingRecord';

// userのセットアップ
const user = userEvent.setup();

const push = jest.fn();
jest.mock('next/navigation', () => {
  const router = jest.requireActual('next/navigation');
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

jest.mock('@/app/reading_records/_actions/updateReadingRecord', () => {
  const updateReadingRecord = jest.requireActual(
    '@/app/reading_records/_actions/updateReadingRecord',
  );
  return {
    __esModule: true,
    ...updateReadingRecord,
  };
});
let updateReadingRecordSpy: jest.SpyInstance<unknown>;

describe('reading_records/_components/organisms/ReadingRecordCreate', () => {
  let readingRecord: ReadingRecordDto;
  beforeEach(() => {
    readingRecord = {
      id: '1',
      title: 'test_title_1',
      author: 'test_author_1',
      bookImage: '',
      learnedContent: 'test_learned_content_1',
      impression: 'test_impression_1',
      createdAt: '2024-07-02',
    };
  });

  it('フォームが表示されること', () => {
    render(<ReadingRecordEdit readingRecord={readingRecord} />);

    // NOTE: 編集画面に書籍検索はない
    expect(screen.queryByLabelText('書籍検索')).not.toBeInTheDocument();

    expect(screen.getByLabelText('本のタイトル')).toBeInTheDocument();
    expect(screen.getByLabelText('著者')).toBeInTheDocument();
    expect(screen.getByLabelText('学んだこと')).toBeInTheDocument();
    expect(screen.getByLabelText('感想')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument();
  });

  it('フォームに入力が反映されること', async () => {
    render(<ReadingRecordEdit readingRecord={readingRecord} />);

    const titleInput = screen.getByLabelText('本のタイトル');
    await user.type(titleInput, '_edited');
    expect(screen.getByLabelText('本のタイトル')).toHaveDisplayValue('test_title_1_edited');

    const authorInput = screen.getByLabelText('著者');
    await user.type(authorInput, '_edited');
    expect(screen.getByLabelText('著者')).toHaveDisplayValue('test_author_1_edited');

    const learnedContentInput = screen.getByLabelText('学んだこと');
    await user.type(learnedContentInput, '_edited');
    expect(screen.getByLabelText('学んだこと')).toHaveDisplayValue('test_learned_content_1_edited');

    const impressionInput = screen.getByLabelText('感想');
    await user.type(impressionInput, '_edited');
    expect(screen.getByLabelText('感想')).toHaveDisplayValue('test_impression_1_edited');
  });

  describe('読書記録の保存', () => {
    beforeEach(() => {
      updateReadingRecordSpy = jest
        .spyOn(UpdateReadingRecord, 'updateReadingRecord')
        .mockResolvedValue({
          id: '1',
          title: 'test_title_edited',
          author: 'test_author_edited',
          bookImage: null,
          learnedContent: 'test_learned_content_edited',
          impression: 'test_impression_edited',
          createdAt: '2024-07-02',
        });
    });

    it('フォームに入力した内容で読書記録を登録できること', async () => {
      render(<ReadingRecordEdit readingRecord={readingRecord} />);

      const titleInput = screen.getByLabelText('本のタイトル');
      await user.type(titleInput, '_edited');

      const authorInput = screen.getByLabelText('著者');
      await user.type(authorInput, '_edited');

      const learnedContentInput = screen.getByLabelText('学んだこと');
      await user.type(learnedContentInput, '_edited');

      const impressionInput = screen.getByLabelText('感想');
      await user.type(impressionInput, '_edited');

      const submitButton = screen.getByRole('button', { name: '保存する' });
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('saved successfully!!')).toBeInTheDocument();
      });
    });
  });
});

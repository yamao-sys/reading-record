import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReadingRecordCreate from '.';
import * as CreateReadingRecord from '@/app/reading_records/_actions/createReadingRecord';
import * as SearchBooks from '@/app/reading_records/_actions/searchBooks';

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

jest.mock('@/app/reading_records/_actions/createReadingRecord', () => {
  const createReadingRecord = jest.requireActual(
    '@/app/reading_records/_actions/createReadingRecord',
  );
  return {
    __esModule: true,
    ...createReadingRecord,
  };
});
let createReadingRecordSpy: jest.SpyInstance<unknown>;

jest.mock('@/app/reading_records/_actions/searchBooks', () => {
  const searchBooks = jest.requireActual('@/app/reading_records/_actions/searchBooks');
  return {
    __esModule: true,
    ...searchBooks,
  };
});
let searchBooksSpy: jest.SpyInstance<unknown>;

describe('reading_records/_components/organisms/ReadingRecordCreate', () => {
  it('フォームが表示されること', () => {
    render(<ReadingRecordCreate />);

    expect(screen.getByLabelText('書籍検索')).toBeInTheDocument();
    expect(screen.getByLabelText('本のタイトル')).toBeInTheDocument();
    expect(screen.getByLabelText('著者')).toBeInTheDocument();
    expect(screen.getByLabelText('学んだこと')).toBeInTheDocument();
    expect(screen.getByLabelText('感想')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '保存する' })).toBeInTheDocument();
  });

  it('フォームに入力が反映されること', async () => {
    render(<ReadingRecordCreate />);

    const titleInput = screen.getByLabelText('本のタイトル');
    await user.type(titleInput, 'test_title');
    expect(screen.getByLabelText('本のタイトル')).toHaveDisplayValue('test_title');

    const authorInput = screen.getByLabelText('著者');
    await user.type(authorInput, 'test_author');
    expect(screen.getByLabelText('著者')).toHaveDisplayValue('test_author');

    const learnedContentInput = screen.getByLabelText('学んだこと');
    await user.type(learnedContentInput, 'test_learned_content');
    expect(screen.getByLabelText('学んだこと')).toHaveDisplayValue('test_learned_content');

    const impressionInput = screen.getByLabelText('感想');
    await user.type(impressionInput, 'test_impression');
    expect(screen.getByLabelText('感想')).toHaveDisplayValue('test_impression');
  });

  describe('書籍検索', () => {
    beforeEach(() => {
      searchBooksSpy = jest.spyOn(SearchBooks, 'searchBooks').mockResolvedValue([
        {
          title: 'test_title',
          author: 'test_author',
          bookImageUrl: 'https://example.com/test.jpg',
        },
      ]);
    });

    it('書籍検索ができ、その内容でフォームが入力できること', async () => {
      render(<ReadingRecordCreate />);

      const searchBooksInput = screen.getByLabelText('書籍検索');
      await user.type(searchBooksInput, 'test_');
      expect(screen.getByLabelText('書籍検索')).toHaveDisplayValue('test_');

      // NOTE: 検索結果が表示される、それを選択するとフォームに反映されること
      await waitFor(async () => {
        await user.click(screen.getByText('test_title'));
      });
      expect(screen.getByLabelText('本のタイトル')).toHaveDisplayValue('test_title');
      expect(screen.getByLabelText('著者')).toHaveDisplayValue('test_author');
      expect(screen.getByAltText('書籍画像')).toHaveAttribute(
        'src',
        '/_next/image?url=https%3A%2F%2Fexample.com%2Ftest.jpg&w=3840&q=75',
      );
    });
  });

  describe('読書記録の保存', () => {
    beforeEach(() => {
      createReadingRecordSpy = jest
        .spyOn(CreateReadingRecord, 'createReadingRecord')
        .mockResolvedValue({
          readingRecord: {
            id: '1',
            title: 'test_title',
            author: 'test_author',
            bookImage: null,
            learnedContent: 'test_learned_content',
            impression: 'test_impression',
            createdAt: '2024-07-02',
          },
        });
      searchBooksSpy = jest.spyOn(SearchBooks, 'searchBooks').mockResolvedValue([
        {
          title: 'test_title',
          author: 'test_author',
          bookImageUrl: 'https://example.com/test.jpg',
        },
      ]);
    });

    it('フォームに入力した内容で読書記録を登録できること', async () => {
      render(<ReadingRecordCreate />);

      const titleInput = screen.getByLabelText('本のタイトル');
      await user.type(titleInput, 'test_title');

      const authorInput = screen.getByLabelText('著者');
      await user.type(authorInput, 'test_author');

      const learnedContentInput = screen.getByLabelText('学んだこと');
      await user.type(learnedContentInput, 'test_learned_content');

      const impressionInput = screen.getByLabelText('感想');
      await user.type(impressionInput, 'test_impression');

      const submitButton = screen.getByRole('button', { name: '保存する' });
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('saved successfully!!')).toBeInTheDocument();
      });
    });

    it('書籍検索で入力された内容で保存ボタンを押下すると、保存に成功し画面遷移されること', async () => {
      render(<ReadingRecordCreate />);

      const searchBooksInput = screen.getByLabelText('書籍検索');
      await user.type(searchBooksInput, 'test_');

      // NOTE: 検索結果が表示される、それを選択するとフォームに反映されること
      await waitFor(async () => {
        await user.click(screen.getByText('test_title'));
      });
      expect(screen.getByLabelText('本のタイトル')).toHaveDisplayValue('test_title');
      expect(screen.getByLabelText('著者')).toHaveDisplayValue('test_author');
      expect(screen.getByAltText('書籍画像')).toHaveAttribute(
        'src',
        '/_next/image?url=https%3A%2F%2Fexample.com%2Ftest.jpg&w=3840&q=75',
      );

      const learnedContentInput = screen.getByLabelText('学んだこと');
      await user.type(learnedContentInput, 'test_learned_content');

      const impressionInput = screen.getByLabelText('感想');
      await user.type(impressionInput, 'test_impression');

      const submitButton = screen.getByRole('button', { name: '保存する' });
      await user.click(submitButton);
      await waitFor(() => {
        expect(screen.getByText('saved successfully!!')).toBeInTheDocument();
      });
    });
  });
});

import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ReadingRecordLists from '.';
import { FetchAllReadingRecordResponseDto } from '@/api/reading_records/@types';
import * as DeleteReadingRecord from '@/app/reading_records/_actions/deleteReadingRecord';

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

jest.mock('@/app/reading_records/_actions/deleteReadingRecord', () => {
  const deleteReadingRecord = jest.requireActual(
    '@/app/reading_records/_actions/deleteReadingRecord',
  );
  return {
    __esModule: true,
    ...deleteReadingRecord,
  };
});
let deleteReadingRecordSpy: jest.SpyInstance<unknown>;

describe('reading_records/_components/organisms/ReadingRecordLists', () => {
  let readingRecords: FetchAllReadingRecordResponseDto;
  beforeEach(() => {
    readingRecords = [
      {
        id: '1',
        title: 'test_title_1',
        author: 'test_author_1',
        bookImage: '',
        learnedContent: 'test_learned_content_1',
        impression: 'test_impression_1',
        createdAt: '2024-07-02',
      },
      {
        id: '2',
        title: 'test_title_2',
        author: 'test_author_2',
        bookImage: '',
        learnedContent: 'test_learned_content_2',
        impression: 'test_impression_2',
        createdAt: '2024-07-01',
      },
    ];
  });

  it('propsで受け取った読書記録が表示されること', () => {
    render(<ReadingRecordLists readingRecords={readingRecords} />);

    // TODO: 書籍画像
    // 書籍タイトル
    expect(screen.getByText('test_title_1')).toBeInTheDocument();
    // 登録日
    expect(screen.getByText(/2024-07-02/)).toBeInTheDocument();
  });

  it('編集画面のボタンを押下すると、画面遷移されること', () => {
    render(<ReadingRecordLists readingRecords={readingRecords} />);

    const editButton = screen.getAllByRole('button', { name: '編集する' });
    user.click(editButton[0]);

    waitFor(() => {
      expect(push).toHaveBeenCalled();
    });
  });

  describe('削除ボタンの押下', () => {
    it('確認ダイアログが表示されること', () => {
      render(<ReadingRecordLists readingRecords={readingRecords} />);

      const editButton = screen.getAllByRole('button', { name: '削除する' });
      user.click(editButton[0]);

      waitFor(() => {
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeVisible();
      });
    });

    it('削除された読書記録が表示されなくなること', () => {
      // NOTE: window.confirmのモック化
      jest.spyOn(window, 'confirm').mockImplementation(() => true);

      // NOTE: deleteReadingRecordのモック化
      deleteReadingRecordSpy = jest
        .spyOn(DeleteReadingRecord, 'deleteReadingRecord')
        .mockResolvedValue({ result: true });

      render(<ReadingRecordLists readingRecords={readingRecords} />);

      const editButton = screen.getAllByRole('button', { name: '削除する' });
      user.click(editButton[0]);

      waitFor(() => {
        expect(screen.getByText('test_title_1')).not.toBeInTheDocument();
      });
    });

    it('削除成功のスナックバーが表示されること', () => {
      // NOTE: window.confirmのモック化
      jest.spyOn(window, 'confirm').mockImplementation(() => true);

      // NOTE: deleteReadingRecordのモック化
      deleteReadingRecordSpy = jest
        .spyOn(DeleteReadingRecord, 'deleteReadingRecord')
        .mockResolvedValue({ result: true });

      render(<ReadingRecordLists readingRecords={readingRecords} />);

      const editButton = screen.getAllByRole('button', { name: '削除する' });
      user.click(editButton[0]);

      waitFor(() => {
        expect(screen.getByText('deleted successfully!!')).not.toBeInTheDocument();
      });
    });
  });
});

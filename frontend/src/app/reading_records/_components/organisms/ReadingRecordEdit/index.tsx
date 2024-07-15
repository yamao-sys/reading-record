'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { updateReadingRecord } from '../../../_actions/updateReadingRecord';
import { BookImage } from '../../molecules/BookImage';
import { BaseFormLayout } from '../BaseFormLayout';
import { ReadingRecordDto, UpdateReadingRecordDto } from '@/api/reading_records/@types';
import { BaseFormBox } from '@/components/atoms/BaseFormBox';
import { BaseSnackbar } from '@/components/atoms/BaseSnackbar';
import { InputForm } from '@/components/atoms/InputForm';
import { TextAreaForm } from '@/components/atoms/TextAreaForm';
import { SubmitButton } from '@/components/molecules/SubmitButton';

type ReadingRecordEditType = {
  readingRecord: ReadingRecordDto;
};

export default function ReadingRecordEdit({ readingRecord }: ReadingRecordEditType) {
  const [inputReadingRecord, setInputReadingRecord] =
    useState<UpdateReadingRecordDto>(readingRecord);

  const updateInputReadingRecord = (params: Partial<UpdateReadingRecordDto>) => {
    setInputReadingRecord({ ...inputReadingRecord, ...params });
  };

  const router = useRouter();

  const hundleSubmit = async () => {
    const response = await updateReadingRecord(readingRecord.id, inputReadingRecord);

    setInputReadingRecord(response);
    setSnackbarState(true);
  };

  const [snackbarState, setSnackbarState] = useState<boolean>(false);

  const handleClose = () => {
    setSnackbarState(false);
    router.push('/reading_records');
    router.refresh();
  };

  const bookImg = useMemo(() => {
    if (inputReadingRecord.bookImage) return inputReadingRecord.bookImage;

    return '/noimage.png';
  }, [inputReadingRecord]);

  return (
    <>
      <BaseSnackbar open={snackbarState} onClose={handleClose} message='saved successfully!!' />

      <BaseFormLayout>
        <BaseFormBox needsMargin={false}>
          <InputForm
            labelId='title'
            labelText='本のタイトル'
            value={inputReadingRecord.title}
            onChange={(e) => updateInputReadingRecord({ title: e.target.value })}
          />
        </BaseFormBox>

        <BaseFormBox>
          <BookImage src={bookImg} alt='書籍画像' widthStyle='w-full' />
        </BaseFormBox>

        <BaseFormBox>
          <InputForm
            labelId='author'
            labelText='著者'
            value={inputReadingRecord.author ?? ''}
            onChange={(e) => updateInputReadingRecord({ author: e.target.value })}
          />
        </BaseFormBox>

        <BaseFormBox>
          <TextAreaForm
            labelId='learned-content'
            labelText='学んだこと'
            value={inputReadingRecord.learnedContent ?? ''}
            onChange={(e) => updateInputReadingRecord({ learnedContent: e.target.value })}
          />
        </BaseFormBox>

        <BaseFormBox>
          <TextAreaForm
            labelId='impression'
            labelText='感想'
            value={inputReadingRecord.impression ?? ''}
            onChange={(e) => updateInputReadingRecord({ impression: e.target.value })}
          />
        </BaseFormBox>

        <SubmitButton labelText='保存する' color='green' onClick={hundleSubmit} />
      </BaseFormLayout>
    </>
  );
}

import { getReadingRecordApiClient } from './_actions/getReadingRecordApiClient'

export default async function ReadingRecords() {
  const readingRecords = await getReadingRecordApiClient().readingRecords.$get()
  return (
    <>
      {!!readingRecords.length &&
        readingRecords.map((readingRecord) => (
          <div key={readingRecord.title}>{readingRecord.title}</div>
        ))}
    </>
  )
}

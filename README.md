# reading-record
Nest.js × Next.js の読書記録アプリ(REST API)

## キャッシュの扱い
- 初期段階では特にキャッシュ意識しなくても良さそう
- 一覧が重く感じてきたら追加、更新、削除処理が行われたら一覧・詳細ページのキャッシュクリアのように扱うか

## コマンド類
開発環境の立ち上げ
```
docker-compose build
docker-compose up
```

NestJSでresource(controller, service, module, entity)を一式作成する
```
nest g resource [name]
```

最新のスキーマ作成
```
npx prisma generate
```

テーブル名とカラム名をコード内ではキャメルケースで、DB上ではスネークケースで扱えるようにスキーマ作成
```
npx prisma-case-format --file prisma/schema.prisma --map-table-case=snake,plural --map-field-case=snake && npx prisma format && npx prisma generate
```

マイグレーション作成
```
npx prisma migrate dev
```

マイグレーション実行
```
npx prisma migrate dev --preview-feature
```

backendのbuild・deploy
```
◆ build
gcloud builds submit --config ./api_server/cloudbuild-api-server-prod.yaml ./api_server/

◆ deploy
gcloud run deploy reading-record --image asia-northeast1-docker.pkg.dev/reading-record-425713/api-server-prod/latest --project reading-record-425713 --platform=managed --region asia-northeast1 --allow-unauthenticated --add-cloudsql-instances reading-record-425713:asia-northeast1:reading-record-production  --set-env-vars="DATABASE_URL=mysql://root:fipbz8ys@localhost:3306/reading_record_prod?socket=/cloudsql/reading-record-425713:asia-northeast1:reading-record-production"
```
Backend URL: https://reading-record-gsczae4q5q-an.a.run.app


frontendのbuild・deploy
```
◆ build
gcloud builds submit --config ./frontend/cloudbuild-api-server-prod.yaml ./frontend/

◆ deploy
gcloud run deploy reading-record-frontend --image asia-northeast1-docker.pkg.dev/reading-record-425713/frontend-prod/latest --project reading-record-425713 --platform=managed --region asia-northeast1 --allow-unauthenticated --set-env-vars="BASE_API_URL=https://reading-record-gsczae4q5q-an.a.run.app"
```
Frontend URL: https://reading-record-frontend-gsczae4q5q-an.a.run.app

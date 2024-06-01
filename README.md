# reading-record
Nest.js × Next.js の読書記録アプリ(REST API)

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

# reading-record

NestJS × Next.js の読書記録アプリ(REST API)

## キャッシュの扱い

- 初期段階では特にキャッシュ意識しなくても良さそう
- 一覧が重く感じてきたら追加、更新、削除処理が行われたら一覧・詳細ページのキャッシュクリアのように扱うか

## コマンド類

開発環境の立ち上げ

```
docker-compose build
docker-compose up
```

NestJS で resource(controller, service, module, entity)を一式作成する

```
nest g resource [name]
```

最新のスキーマ作成

```
npx prisma generate
```

テーブル名とカラム名をコード内ではキャメルケースで、DB 上ではスネークケースで扱えるようにスキーマ作成

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

Storybook の公開

```
npx chromatic --project-token=<project_token>
```

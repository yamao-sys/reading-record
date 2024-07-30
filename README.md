# reading-record

NestJS × Next.js の読書記録アプリ(REST API)

## 技術構成
### フロントエンド
- TypeScript
- React v18
- Next.js(SSR) v14
- Context API
- Tailwind CSS
- Aspida
- Jest, Testing Library
- ESLint, Prettier
- Storybook
- Chromatic

### バックエンド
- TypeScript
- Node.js, Express
- NextJS
- Prisma
- Jest
- class-validator
- ESLint, Prettier

### インフラ
- Google Cloud(Artifact Registry, Cloud Run, Cloud SQL, Cloud Storage)

## 技術選定背景
### 基本方針
可能な限り、低コストでスピードを保って開発ができる構成
- フロントエンド、バックエンドともにTypeScript一色で構築
- ある程度枯れていて、参考となる事例が豊富
- 拡張しやすい構成にしたい

### フロントエンドの選定
- App Router
  - SSR構成で作ってみたかった
  - 技術検証をメインに選定
  - SPAで良いなら、あえて選定しなくても良いかも(Vite × Reactでも良さそう)

- Server Components, Client Components
  - サーバ側にデータ取得処理を集めることにより、クライアントの端末や環境によらずにパフォーマンスを確保できるように
  - サーバ側とクライアント側それぞれの責務をわかりやすくするため

- Context API
  - 特に他の状態管理ライブラリを使用する必要がなかったため、ライブラリを入れなくても実現できるもの

- Tailwind CSS
  - Next.js(App Router)でも導入できる
    - Emotion, Styled-ComponentsもClient Componentなら入れられるが、レイアウトをすでに用意されていてスピーディに行えるTailwind CSSを選定

- Aspida
  - OpenAPI(Swagger)から型とAPIクライアントを自動で生成・使用できるようにすることで工数削減

### バックエンドの選定
- NestJS
  - Expressがフレームワークで簡単に
  - レイヤードアーキテクチャで、実装しやすい & 拡張しやすい

- Prisma
  - ORMでやりたいことが一通りできる
    - CRUD, Eager load
  - TypeORMと比較して実行したいSQLを書きやすい
    - が、バリデーションはTypeORMの方がクラスベースなので書きやすい
  - マイグレーションの自動生成が便利

### インフラの選定
以下を背景にGoogle Cloudベースで選定
- 無料枠が大きい
- 情報量が豊富
- フルマネージドでサービス開発に注力しやすい
- 設定が比較的簡単で使いやすい

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

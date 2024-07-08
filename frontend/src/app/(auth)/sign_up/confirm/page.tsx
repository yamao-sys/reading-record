import { SignUpConfirmTemplate } from '../_components/templates/SignUpConfirmTemplate';

export default async function SignUpConfirmPage() {
  // TODO: /sign_up以外からの遷移を不可能にする
  return (
    <>
      <SignUpConfirmTemplate />
    </>
  );
}

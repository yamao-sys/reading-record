'use client';

type Props = {
  labelText: string;
  color: 'green' | 'gray' | 'red';
  additionalStyle?: string;
} & JSX.IntrinsicElements['button'];

export const BaseButton = ({ labelText, color, additionalStyle = '', onClick }: Props) => {
  return (
    <>
      <button
        className={`py-2 px-8 border-${color}-500 bg-${color}-500 rounded-xl text-white ${additionalStyle}`}
        onClick={onClick}
      >
        {labelText}
      </button>
    </>
  );
};

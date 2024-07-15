import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  widthStyle: string;
  additionalImageStyle?: string;
};

export const BookImage = ({ src, alt, widthStyle, additionalImageStyle = '' }: Props) => {
  return (
    <>
      <div className={`flex ${widthStyle} justify-center`}>
        <div className={`w-24 h-32 relative ${additionalImageStyle}`}>
          <Image src={src} alt={alt} fill />
        </div>
      </div>
    </>
  );
};

import React, { PropsWithChildren } from 'react';

const Jsx = () => {
  return (
    <div>
      <$></$>
      <_></_>
      <JSXChild />
      <TexOrHeading isHeading={true} children="Heading" />
      <TexOrHeading isHeading={false} children="Not Heading" />
      <TextOrHeading2 isHeading={true} />
      <TextOrHeading2 isHeading={false} />
    </div>
  );
};

export default Jsx;

function $() {
  return <div>$</div>;
}

function _() {
  return <div>_</div>;
}

const JSXChild = () => {
  return <>{(() => 'foo')()}</>;
};

function TexOrHeading({
  isHeading,
  children,
}: PropsWithChildren<{
  isHeading: boolean;
}>) {
  return React.createElement(
    isHeading ? 'h1' : 'span',
    { className: 'text' },
    children
  );
}

function TextOrHeading2({
  isHeading,
  children,
}: PropsWithChildren<{ isHeading: boolean }>) {
  return isHeading ? (
    <h1 className="text">{children}</h1>
  ) : (
    <span className="text">{children}</span>
  );
}

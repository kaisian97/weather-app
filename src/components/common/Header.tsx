import { PropsWithChildren } from "react";

type HeaderProps = {
  hr?: boolean; // horizontal line
};

const Header = ({ children, hr = true }: PropsWithChildren<HeaderProps>) => {
  return (
    <div className="my-2 mx-4">
      <h1 className="font-bold py-2 text-2xl tracking-wider">{children}</h1>
      {hr && <hr />}
    </div>
  );
};

export default Header;

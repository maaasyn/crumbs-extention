type Props = {
  children?: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return <div className="w-72 border-black border-2">{children}</div>;
};

import StyledDiv from './Container';

const Container = ({ children }: { children: React.ReactNode }) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Container;

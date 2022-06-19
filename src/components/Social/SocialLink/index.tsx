import { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { StyledLink } from './style';

export const SocialLink: FunctionComponent<
  PropsWithChildren<{ href: string; logo?: ReactNode }>
> = ({ href, children, logo }) => {
  return (
    <StyledLink href={href} rel="noopener noreferrer" target="_blank">
      {logo}
      {children}
    </StyledLink>
  );
};

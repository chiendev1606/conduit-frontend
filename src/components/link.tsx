import * as React from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(({ children, ...props }, ref) => {
  // Ensure there's always accessible content
  const hasChildren = !!children;

  return (
    <a
      ref={ref}
      {...props}
      aria-label={!hasChildren ? (props['aria-label'] ?? 'Navigation link') : undefined}
      className={'text-primary inline-block'}
    >
      {children}
    </a>
  );
});

const CreatedLinkComponent = createLink(BasicLinkComponent);

export const Link: LinkComponent<typeof BasicLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      preload={'intent'}
      {...props}
    />
  );
};

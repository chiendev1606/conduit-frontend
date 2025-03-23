import DOMPurify from 'dompurify';
import { HTMLAttributes } from 'react';

interface SanitizedHtmlProps extends HTMLAttributes<HTMLDivElement> {
  html: string;
  className?: string;
}

/**
 * A component that safely renders HTML content after sanitizing it with DOMPurify.
 * Use this instead of dangerouslySetInnerHTML to prevent XSS attacks.
 */
export const SanitizedHtml = ({ html, className = '', ...props }: SanitizedHtmlProps) => {
  // Sanitize the HTML content
  const sanitizedHtml = DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ALLOWED_TAGS: [
      'p',
      'b',
      'i',
      'em',
      'strong',
      'a',
      'ul',
      'ol',
      'li',
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
      'hr',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'style'],
  });

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      {...props}
    />
  );
};

import { cn } from "@/lib/utils";

const addressRegex = /Alarobia, Rue Tsarasaotra, Antananarivo 101(?:,\s*Madagascar)?/g;

export interface AddressLinkProps {
  children: string;
  className?: string;
}

export const AddressLink = ({ children, className }: AddressLinkProps) => {
  const parts = children.split(addressRegex);
  const matches = children.match(addressRegex) ?? [];

  return (
    <span className={cn(className)}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < matches.length && (
            <a
              href="https://maps.app.goo.gl/oKPJMuFEaW4FH6vTA"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-cyan"
            >
              {matches[i]}
            </a>
          )}
        </span>
      ))}
    </span>
  );
};

export default AddressLink;

import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/home" className={cn("flex items-center gap-2 text-primary", className)}>
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c.93 0 1.83-.13 2.68-.38" />
        <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10c-.93 0-1.83-.13-2.68-.38" transform="scale(-1, 1) translate(-24, 0)" />
      </svg>
      <span className="text-2xl font-bold tracking-tight text-foreground">
        BookBuddy
      </span>
    </Link>
  );
}

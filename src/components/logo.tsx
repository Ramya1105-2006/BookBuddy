import { Ticket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/home" className={cn("flex items-center gap-2 text-primary", className)}>
      <Ticket className="h-8 w-8" />
      <span className="text-2xl font-bold tracking-tight text-foreground">
        BookBuddy
      </span>
    </Link>
  );
}

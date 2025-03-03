import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface SplitSectionItemProps {
  title: string;
  description: string;
  icon: LucideIcon;
  buttonText: string;
  buttonHref: string;
  color: 'blue' | 'purple' | 'green' | 'red';
  className?: string;
}

export function SplitSectionItem({
  title,
  description,
  icon: Icon,
  buttonText,
  buttonHref,
  color,
  className,
}: SplitSectionItemProps) {
  const colorClasses = {
    blue: {
      bg: 'bg-gradient-to-br from-blue-400 to-blue-300',
      iconBg: 'bg-blue-200',
      iconColor: 'text-blue-600',
    },
    purple: {
      bg: 'bg-gradient-to-br from-purple-500 to-purple-400',
      iconBg: 'bg-purple-300',
      iconColor: 'text-purple-700',
    },
    green: {
      bg: 'bg-gradient-to-br from-green-400 to-green-300',
      iconBg: 'bg-green-200',
      iconColor: 'text-green-600',
    },
    red: {
      bg: 'bg-gradient-to-br from-red-400 to-red-300',
      iconBg: 'bg-red-200',
      iconColor: 'text-red-600',
    },
  };

  return (
    <div className={cn('p-12 text-white', colorClasses[color].bg, className)}>
      <div className="flex flex-col items-start space-y-8">
        <div className={cn('rounded-full p-3', colorClasses[color].iconBg)}>
          <Icon className={cn('h-8 w-8', colorClasses[color].iconColor)} />
        </div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-lg">{description}</p>
        <a href={buttonHref}>
          <Button variant="black" size="lg">
            {buttonText}
          </Button>
        </a>
      </div>
    </div>
  );
}

interface SplitSectionProps {
  items: SplitSectionItemProps[];
  className?: string;
}

export function SplitSection({ items, className }: SplitSectionProps) {
  return (
    <div className={cn('overflow-hidden rounded-xl', className)}>
      <div
        className={cn(
          'grid grid-cols-1',
          items.length > 1 ? 'md:grid-cols-2' : ''
        )}
      >
        {items.map((item, index) => (
          <SplitSectionItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

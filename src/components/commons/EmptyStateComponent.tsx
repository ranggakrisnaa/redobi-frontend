import { FileX, LucideIcon, Plus } from 'lucide-react';
import React from 'react';

type Size = 'small' | 'medium' | 'large';
type Variant = 'default' | 'minimal' | 'detailed';

interface EmptyStateProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: LucideIcon;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FileX,
  title = 'Belum Ada Data',
  description = 'Data belum tersedia. Mulai dengan menambahkan data pertama Anda.',
  actionLabel = 'Tambah Data',
  onAction,
  actionIcon: ActionIcon = Plus,
  variant = 'default',
  size = 'medium',
  className = '',
}) => {
  const sizeClasses = {
    small: {
      container: 'py-8 px-4',
      iconWrapper: 'w-16 h-16 mb-4',
      icon: 'w-8 h-8',
      title: 'text-lg',
      description: 'text-sm mb-4',
      button: 'px-4 py-2 text-sm',
      buttonIcon: 'w-4 h-4',
    },
    medium: {
      container: 'py-12 px-6',
      iconWrapper: 'w-20 h-20 mb-6',
      icon: 'w-10 h-10',
      title: 'text-xl',
      description: 'text-base mb-6',
      button: 'px-6 py-3',
      buttonIcon: 'w-5 h-5',
    },
    large: {
      container: 'py-16 px-8',
      iconWrapper: 'w-24 h-24 mb-8',
      icon: 'w-12 h-12',
      title: 'text-2xl',
      description: 'text-lg mb-8',
      button: 'px-8 py-4 text-lg',
      buttonIcon: 'w-6 h-6',
    },
  };

  const sizes = sizeClasses[size];

  const variantStyles = {
    default: {
      container: 'bg-white',
      iconWrapper: 'bg-gray-100',
      iconColor: 'text-gray-400',
      title: 'text-gray-900',
      description: 'text-gray-500',
      button: 'bg-blue-600 text-white hover:bg-blue-700',
    },
    minimal: {
      container: 'bg-transparent',
      iconWrapper: 'bg-gray-50',
      iconColor: 'text-gray-300',
      title: 'text-gray-700',
      description: 'text-gray-400',
      button: 'bg-gray-600 text-white hover:bg-gray-700',
    },
    detailed: {
      container:
        'bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl',
      iconWrapper: 'bg-blue-50 border border-blue-100',
      iconColor: 'text-blue-400',
      title: 'text-gray-900',
      description: 'text-gray-600',
      button:
        'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${sizes.container} ${styles.container} ${className}`}
    >
      <div
        className={`${sizes.iconWrapper} rounded-full ${styles.iconWrapper} flex items-center justify-center`}
      >
        <Icon className={`${sizes.icon} ${styles.iconColor}`} />
      </div>

      <h3 className={`${sizes.title} font-semibold ${styles.title} mb-2`}>
        {title}
      </h3>

      <p className={`${sizes.description} ${styles.description} max-w-md`}>
        {description}
      </p>

      {onAction && (
        <button
          onClick={onAction}
          className={`inline-flex items-center ${sizes.button} ${styles.button} font-medium rounded-lg transition-all duration-200`}
        >
          <ActionIcon className={`${sizes.buttonIcon} mr-2`} />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

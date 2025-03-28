import { Skeleton } from '../../Skeleton/Skeleton'; // ✅ Using your existing Skeleton component
// import './button.css';
import {ButtonProps} from '../../../Datatypes/interface'
export type IconPosition = 'left' | 'right' | 'top' | 'bottom';

export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  isLoading = false,
  onLoading = false, // ✅ Controlled global loading state
  className = '',
  icon,
  iconPosition = 'left',
  iconSpacing = 8,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const buttonClasses = ['storybook-button', `storybook-button--${size}`, mode, className].join(' ');

  // Calculate dimensions based on button size
  const getButtonDimensions = () => {
    switch (size) {
      case 'small':
        return { width: 100, height: 32 };
      case 'large':
        return { width: 140, height: 44 };
      default:
        return { width: 120, height: 38 };
    }
  };

  if (isLoading || onLoading) {
    const { width, height } = getButtonDimensions();
    return (
      <Skeleton 
        width={width} 
        height={height} 
        borderRadius="3em" 
        isAnimated={true} 
        className={buttonClasses} 
      />
    );
  }

  const getButtonContent = () => {
    const displayLabel = label || children;

    if (!icon) {
      return displayLabel;
    }

    const styles = {
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: `${iconSpacing}px`,
        // ...(iconPosition === 'top' || iconPosition === 'bottom' ? { flexDirection: 'column' } : {})
      }
    };

    const iconElement = <span className="button-icon">{icon}</span>;

    return (
      <div style={styles.container}>
        {iconPosition === 'top' || iconPosition === 'left' ? iconElement : null}
        {displayLabel}
        {iconPosition === 'bottom' || iconPosition === 'right' ? iconElement : null}
      </div>
    );
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      style={{ backgroundColor }}
      disabled={disabled}
      {...props}
    >
      {getButtonContent()}
    </button>
  );
};

export default Button;

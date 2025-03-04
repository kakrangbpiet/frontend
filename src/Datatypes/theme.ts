export interface Theme {
    colors: {
      primary: string;
      secondary: string;
      lightText: string;
      background: string;
      text: string;
    };
    typography: {
      fontSize: {
        small: string;
        medium: string;
        large: string;
      };
      fontWeight: {
        medium: string;
      };
    };
    spacing: {
      lg: string;
      md: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
    breakpoints?: {
      sm: string;
    };
  }
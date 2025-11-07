export const theme = {
  // PUBLIC_INTERFACE
  colors: {
    /** Primary brand color used for header and key accents. */
    primary: '#003366',
    /** Secondary accent color used for highlights and active states. */
    secondary: '#ec7115',
    /** Background color used for app background areas. */
    background: '#f2f2f2',
    /** Accent color used for foreground surfaces like cards and header text. */
    accent: '#ffffff'
  }
};

/**
 * PUBLIC_INTERFACE
 * getTheme
 * Returns the shared theme object for the application.
 */
export function getTheme() {
  return theme;
}

import '@xstyled/system';
import '@emotion/react';
import { ITheme, DefaultTheme as XStyledDefaultTheme } from '@xstyled/emotion';

interface AppTheme extends ITheme, XStyledDefaultTheme {
  /* Customize your theme */
}

// and extend them!
declare module '@xstyled/system' {
  export interface Theme extends AppTheme {}
}
declare module '@emotion/react' {
  export interface Theme extends XStyledDefaultTheme {
    /* Customize your theme */
  }
}

import type { GlobalThemeOverrides } from 'naive-ui/lib';
import { useResize } from '@/module/resize';
const { smallResolution, handleWindowSizeChange } = useResize();

export function theme() {
  handleWindowSizeChange();
  const rem = (px: string, base = 16): string => {
    const tempPx = px.replace('px', '');

    const tempPxNum = parseInt(tempPx, 10);

    return `${(1 / base) * tempPxNum}rem`;
  };

  const smallResCheck = (initial: string, small: string): string => {
    return smallResolution.value ? small : initial;
  };

  const darkThemeOverrides: GlobalThemeOverrides = {
    common: {
      fontFamily: 'Mulish',
      textColor1: '#fff',
      hoverColor: '#6F6F6F',
      primaryColor: '#6F6F6F',
      baseColor: '#272727',
      textColorBase: '#fff',
      fontSize: smallResCheck('24px', '18px'),
      fontSizeHuge: smallResCheck('64px', '48px'),
      fontSizeMedium: smallResCheck('30px', '16px'),
      fontSizeSmall: smallResCheck('21px', '14px'),
      errorColor: '#FF3030',
    },
    Button: {
      textColor: '#fff',
      colorHover: '#6F6F6F',
      colorQuaternaryHover: 'transparent',
      textColorHover: '#fff',
      textColorFocus: '#6F6F6F',
      textColorTextHover: '#6F6F6F',
      border: 'none',
      borderHover: 'none',
      borderPressed: 'none',
      borderFocus: 'none',
      fontSizeSmall: smallResCheck('21px', '16px'),
      peers: {
        Tags: {},
      },
    },
    Modal: {
      peers: {
        Card: {
          borderRadius: '30px',
          colorModal: '#1E1E1E',
          titleFontSizeMedium: smallResCheck('24px', '18px'),
          closeIconSize: smallResCheck('21px', '16px'),
          closeIconColor: '#6F6F6F',
          closeColorHover: 'transparent',
          closeColorPressed: 'transparent',
        },
      },
    },
    Layout: {
      color: '#272727',
      siderColor: '#272727',
      peers: {
        Scrollbar: {
          color: '#6F6F6F',
        },
      },
    },
    Card: {
      color: '#272727',
      borderColor: '#1E1E1E',
      borderRadius: '10px',
    },
    DataTable: {
      borderRadius: '10px',
      borderColor: '#1E1E1E',
      thTextColor: '#6E6E6E',
      fontSizeLarge: smallResCheck('16px', '12px'),
      fontSizeMedium: smallResCheck('16px', '12px'),
    },
    DatePicker: {
      itemFontSize: smallResCheck('14px', '12px'),
      calendarDaysFontSize: smallResCheck('16px', '14px'),
      calendarTitleFontSize: smallResCheck('18px', '16px'),
      panelColor: '#1E1E1E',
    },
  };

  const lightThemeOverrides: GlobalThemeOverrides = {
    common: {
      fontFamily: 'Mulish',
      textColor1: '#272727',
      fontSize: smallResCheck('24px', '18px'),
      fontSizeHuge: smallResCheck('64px', '48px'),
      fontSizeMedium: smallResCheck('30px', '16px'),
      fontSizeSmall: smallResCheck('21px', '14px'),
      errorColor: '#FF3030',
    },
    Button: {
      textColor: '#272727',
      colorQuaternaryHover: 'transparent',
      textColorHover: '#1E1E1E',
      textColorFocus: '#1E1E1E',
      textColorTextHover: '#1E1E1E',
      border: 'none',
      borderHover: 'none',
      borderPressed: 'none',
      borderFocus: 'none',
      fontSizeSmall: smallResCheck('21px', '16px'),
      peers: {
        Tags: {},
      },
    },
    Modal: {
      peers: {
        Card: {
          borderRadius: '30px',
          titleFontSizeMedium: smallResCheck('24px', '18px'),
          closeIconSize: smallResCheck('21px', '16px'),
          closeColorHover: 'transparent',
          closeColorPressed: 'transparent',
        },
      },
    },
    Layout: {
      peers: {
        Scrollbar: {
          color: '#6F6F6F',
        },
      },
    },
    Card: {
      borderRadius: '10px',
    },
    DataTable: {
      borderRadius: '10px',
      borderColor: '#1E1E1E',
      fontSizeLarge: smallResCheck('16px', '12px'),
      fontSizeMedium: smallResCheck('16px', '12px'),
    },
    DatePicker: {
      itemFontSize: smallResCheck('14px', '12px'),
      calendarDaysFontSize: smallResCheck('16px', '14px'),
      calendarTitleFontSize: smallResCheck('18px', '16px'),
    },
  };

  return { darkThemeOverrides, lightThemeOverrides };
}

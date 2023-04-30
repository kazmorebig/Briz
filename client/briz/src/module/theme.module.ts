import type { GlobalThemeOverrides } from 'naive-ui/lib';

export function theme() {
  const darkThemeOverrides: GlobalThemeOverrides = {
    common: {
      fontFamily: 'Mulish',
      textColor1: '#fff',
      hoverColor: '#6F6F6F',
      primaryColor: '#6F6F6F',
      baseColor: '#272727',
      textColorBase: '#fff',
      fontSize: '24px',
      fontSizeHuge: '64px',
      fontSizeMedium: '30px',
      fontSizeSmall: '21px',
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
      fontSizeSmall: '21px',
      peers: {
        Tags: {},
      },
    },
    Modal: {
      peers: {
        Card: {
          borderRadius: '30px',
          colorModal: '#1E1E1E',
          titleFontSizeMedium: '24px',
          closeIconSize: '22px',
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
    },
    DatePicker: {
      itemFontSize: '14px',
      calendarDaysFontSize: '16px',
      calendarTitleFontSize: '18px',
      panelColor: '#1E1E1E',
    },
  };
  const lightThemeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#FF8C00',
      baseColor: '#FF8C00',
    },
    Button: {
      textColor: '#FF0000',
    },
  };
  return { darkThemeOverrides, lightThemeOverrides };
}

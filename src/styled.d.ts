import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    bgColor: string;
    grayLight: string;
    grayNormal: string;
    grayDark: string;
    accentLight: string;
    accentNormal: string;
    accentDark: string;
    borderColor: string;
  }
}

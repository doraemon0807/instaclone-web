import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontColor: string;
    bgColor: string;
    grayColor: string;
    accentLight: string;
    accentNormal: string;
    accentDark: string;
    borderColor: string;
  }
}

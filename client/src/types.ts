import type { ReactHTMLElement } from "react";

export interface INavLink {
  name: string;
  to: string;
}

export interface NavbarProps {
  navLinks: INavLink[];
}

export interface IFeature {
  title: string;
  icon: string;
  description: string;
}

export interface ISectionTitle {
  text1: string;
  text2: string;
  text3: string;
}

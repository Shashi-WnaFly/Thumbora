export interface INavLink{
    name: string;
    to: string;
}

export interface NavbarProps{
    navLinks: INavLink[];
}
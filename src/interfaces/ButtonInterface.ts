import { ReactNode } from "react";

export interface ButtonInterface {
	children: ReactNode;
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	to?: string;
	type?: 'primary' | 'small' | 'secondary';
}
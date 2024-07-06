import { ReactNode } from "react";

export interface ButtonInterface {
	children: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	to?: string;
	type?: 'primary' | 'small' | 'secondary';
}
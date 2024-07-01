import { ReactNode } from "react";

export interface ButtonInterface {
	children: ReactNode;
	disabled?: boolean;
	to?: string;
	type?: 'primary' | 'small' | 'secondary';
}
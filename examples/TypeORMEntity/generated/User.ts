import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class User {

	id: number;
	name: string;
	status: string;
	isadmin: boolean;

}

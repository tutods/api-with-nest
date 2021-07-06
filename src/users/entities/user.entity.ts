import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
	BeforeInsert,
	BeforeUpdate,
	Column,
	Entity,
	PrimaryGeneratedColumn
} from 'typeorm';

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column()
	@Exclude()
	password: string;

	@BeforeInsert()
	@BeforeUpdate()
	private async generateHashPassword() {
		if (this.password) {
			this.password = await hash(this.password, Number(process.env.SALT));
		}
	}
}

import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity('courses')
export class Course {
	@PrimaryGeneratedColumn('uuid')
	readonly id: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@JoinTable()
	@ManyToMany(() => Tag, (tag) => tag.courses, { cascade: true })
	tags: Tag[];
}

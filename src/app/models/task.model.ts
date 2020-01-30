import { User } from './user.model';
import { Project } from './project.model';
export interface Task {
    id: number;
    name: string;
    projet: Project;
    user: User;
}

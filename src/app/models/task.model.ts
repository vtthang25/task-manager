export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  completed: boolean;
  filter?: string;
}

import { createAction, props } from '@ngrx/store';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface NewTask extends Omit<Task, 'id'> {
  title: string;
  completed: boolean;
}

// Load Tasks
export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: any }>());

// Add Task
export const addTask = createAction('[Task] Add Task', props<{ task: Omit<Task, 'id'> }>());
export const addTaskSuccess = createAction('[Task] Add Task Success', props<{ task: Task }>());
export const addTaskFailure = createAction('[Task] Add Task Failure', props<{ error: any }>());

// Update Task
export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());
export const updateTaskSuccess = createAction('[Task] Update Task Success', props<{ task: Task }>());
export const updateTaskFailure = createAction('[Task] Update Task Failure', props<{ error: any }>());

// Delete Task
export const deleteTask = createAction('[Task] Delete Task', props<{ id: string }>());
export const deleteTaskSuccess = createAction('[Task] Delete Task Success', props<{ id: string }>());
export const deleteTaskFailure = createAction('[Task] Delete Task Failure', props<{ error: any }>());

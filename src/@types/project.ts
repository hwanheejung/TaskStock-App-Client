export interface Project {
  project_id: number;
  name: string;
  public_range: publicType;
  user_id: number;
  todo_count: number;
  retrospect_count: number;
}

export type publicType = "all" | "follow" | "none";

export interface ProjectForm {
  project_id?: number;
  name: string;
  public_range: publicType;
  progress: "complete" | "inProgress";
}

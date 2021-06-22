import { Status } from "./enums";

export interface ProjectModel {
  _id: number;
  name: string;
  location: string;
  start: number;
  size: number;
  type: number;
  ownership: string;
  status: Status;
}

export const ProjectStatusArr = [
  { value: Status.NA, label: 'Started' },
  { value: Status.PENDING, label: 'In Progress' },
  { value: Status.COMPLETED, label: 'Completed' },
];

export enum ProjectType {
  RESIDENTIAL = 0,
  COMMERCIAL,
  RESIDENTIALCOMMERCIAL
}

export const ProjectTypeArr = [
  { value: ProjectType.RESIDENTIAL, label: 'Residential' },
  { value: ProjectType.COMMERCIAL, label: 'Commercial' },
  { value: ProjectType.RESIDENTIALCOMMERCIAL, label: 'Residential Cum Commercial' },
];
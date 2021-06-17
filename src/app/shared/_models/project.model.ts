export interface ProjectModel {
  _id: string;
  name: string;
  location: string;
  start: number;
  size: number;
  type: number;
  ownership: string;
  status: ProjectStatus;
}

export enum ProjectStatus {
  NA = 0,
  NOTRECEIVED,
  RECEIVED,
  VERIFICATION,
  PENDING,
  COMPLETED,
  EXPIRED,
  DRAFT,
  SIGNED,
}

export const ProjectStatusArr = [
  { value: ProjectStatus.NA, label: 'NA' },
  { value: ProjectStatus.NOTRECEIVED, label: 'Not Received' },
  { value: ProjectStatus.RECEIVED, label: 'Received' },
  { value: ProjectStatus.VERIFICATION, label: 'Verification' },
  { value: ProjectStatus.PENDING, label: 'Pending' },
  { value: ProjectStatus.COMPLETED, label: 'Completed' },
  { value: ProjectStatus.EXPIRED, label: 'Expired' },
  { value: ProjectStatus.DRAFT, label: 'Draft' },
  { value: ProjectStatus.SIGNED, label: 'Signed' },
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
import { Status, ProjectPhase } from './enums';


export const DocumentStatusArr = [
  { value: Status.NA, label: 'NA' },
  { value: Status.NOTRECEIVED, label: 'Not Received' },
  { value: Status.RECEIVED, label: 'Received' },
  { value: Status.VERIFICATION, label: 'Verification' },
  { value: Status.PENDING, label: 'Pending' },
  { value: Status.COMPLETED, label: 'Completed' },
  { value: Status.EXPIRED, label: 'Expired' },
  { value: Status.DRAFT, label: 'Draft' },
  { value: Status.SIGNED, label: 'Signed' },
];

export interface DocumentInterface {
  expiredate?: number;
  signeddate?: number;
  signedby?: string;
  childDocs?: DocumentInterface[];
  createdby: string;
  projectid: number;
  createddate: number;
  status: Status;
  expirenotify?: number;
  phase: ProjectPhase;
  remarks?: string;
  parentid?: string;
  name: string;
  _id: number | string;
}
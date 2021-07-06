import documents from '../../../assets/data/documents.json';
import { DocumentInterface, Status } from '../_models';


const createDocument = (index: number, document: Partial<DocumentInterface>, projectId: number): DocumentInterface => {
  const createdDocument: DocumentInterface = {
    _id: document._id || `documents$${index}`,
    name: document.name || '',
    createddate: new Date().getTime(),
    remarks: document.remarks || '',
    phase: document.phase || 1,
    expirenotify: document.expirenotify || 0,
    status: document.status || Status.DRAFT,
    signedby: document.signedby || '',
    createdby: 'primeDev',
    projectid: projectId
  };

  if (document.signeddate) {
    createdDocument.signeddate = document.signeddate;
  }
  if (document.expiredate) {
    createdDocument.expiredate = document.expiredate;
  }

  if (document.parentid && typeof document.parentid == 'string') {
    createdDocument.parentid = `documents$${parseInt(document.parentid || '0') - 1}`;
  } else if (document.parentid) {
    createdDocument.parentid = document.parentid;
  }
  return createdDocument;
}

export const createDocumentsMutation = (projectId: number) => {
  const documentTransactions: any[] = [];
  for(let i = 0; i < documents.documents.length; i++) {
    documentTransactions.push(createDocument(i, documents.documents[i], projectId));
  }
  return documentTransactions;
}

export const createDocumentMutation = (doc: DocumentInterface) => {
  return [createDocument(0, doc, doc.projectid)];
}

export const deleteProjectMutation = (projectId: number | string) => {
  return [{
    _id: projectId,
    _action: "delete"
  }]
}

export const deleteDocumentMutation = (documentIds: (number | string)[]) => {
  return documentIds.map((documentId: number | string) => {
    return {
      _id: documentId,
      _action: "delete"
    }
  })
}
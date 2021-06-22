import documents from '../../../assets/data/documents.json';
import { DocumentInterface } from '../_models';


const createDocument = (index: number, document: Partial<DocumentInterface>, projectId: number): DocumentInterface => {
  const createdDocument: DocumentInterface = {
    _id: `documents$${index}`,
    name: document.name || '',
    createddate: new Date().getTime(),
    remarks: '',
    phase: document.phase || 0,
    expirenotify: 0,
    status: 0,
    createdby: 'User',
    projectid: projectId
  };

  if (document.parentid) {
    createdDocument.parentid = `documents$${parseInt(document.parentid || '0') - 1}`;
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

export const deleteProjectMutation = (projectId: number | string) => {
  return [{
    _id: projectId,
    _action: "delete"
  }]
}

export const deleteDocumentMutation = (documentId: number | string) => {
  return [{
    _id: documentId,
    _action: "delete"
  }]
}
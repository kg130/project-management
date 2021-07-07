

export const fetchProjectsQuery = { "select": ["*"], "from": "projects" };

export const fetchProjectById = (projectId: number) => {
  return {
    select: ["*"],
    from: [projectId]
  }
}

export const fetchDocumentsByProjectId = (projectId: number) => {
  return {
    select: ["*"],
    from: "documents",
    where: `documents/projectid = ${projectId}`,
    opts: { orderBy: "documents/phase" }
  }
}

export const fetchSummary = () => {
  return {
    "select": {"?documents": ["*", {"projectid": ["*", {"_as": "project"}]}]},
    "where": [
      ["?documents", "documents/status", "?status"],
      ["?documents", "documents/expirenotify", "?expirenotify"],
      {"optional": [
        ["?documents", "documents/expiredate", "?expiredate"]
      ]},
      {"filter": [
        "(or (not= 7 ?status) (and (= 7 ?status) (not= 0 ?expirenotify) (bound ?expiredate) (> (now) (- ?expiredate ?expirenotify))))"
      ]}
    ]
  }
}
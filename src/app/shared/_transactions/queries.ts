

export const fetchProjectsQuery = { "select": ["*"], "from": "projects" };

export const fetchProjectById = (projectId: number) => {
  return {
    select: ["*"],
    from: [projectId]
  }
}

export const fetchDocumentsByProjectId = (projectId: number) => {
  return {
    "select": {"?documents": ["*", {"projectid": ["*", {"_as": "project"}]}]},
    "where": [
      ["?documents", "documents/phase", "?phase"],
      {"optional": [
        ["?documents", "documents/projectid", "?projectid"]
      ]},
      {"filter": [
        `(or (= ${projectId} ?projectid) (nil? ?projectid))`
      ]}
    ],
    opts: { orderBy: "?phase" }
  }
}

export const fetchSummary = () => {
  return {
    "select": {"?documents": [
      "*", 
      {"projectid": ["*", {"_as": "project"}]},
      {"parentid": ["*", {"_as": "parentDoc"}]},
    ]},
    "where": [
      ["?documents", "documents/status", "?status"],
      ["?documents", "documents/expirenotify", "?expirenotify"],
      {"optional": [
        ["?documents", "documents/expiredate", "?expiredate"]
      ]},
      {"filter": [
        "(or (and (not= 7 ?status) (not= 1 ?status)) (and (= 7 ?status) (not= 0 ?expirenotify) (bound ?expiredate) (> (now) (- ?expiredate ?expirenotify))))"
      ]}
    ]
  }
}
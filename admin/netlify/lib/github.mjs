// GitHub Contents API helpers for committing journal articles to the public repo.
// Articles live at prague-tour-guide/content/journal/<slug>.json; committing one
// triggers the public Netlify site to rebuild (its prebuild regenerates the
// journal data). Not under netlify/functions/, so it's bundled, not an endpoint.
//
// Env: GITHUB_TOKEN (fine-grained PAT, contents:write on the repo),
//      GITHUB_REPO = "owner/name", GITHUB_BRANCH (deploy branch, default main).

const API = 'https://api.github.com';

export const JOURNAL_DIR = 'prague-tour-guide/content/journal';

export function cfg() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!token || !repo) {
    throw new Error('GitHub nicht konfiguriert (GITHUB_TOKEN / GITHUB_REPO fehlen).');
  }
  return { token, repo, branch };
}

function ghHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'zuzapragtour-admin',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function ghContents(path) {
  const { token, repo, branch } = cfg();
  const url = `${API}/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`;
  const r = await fetch(url, { headers: ghHeaders(token) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`GitHub GET ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

/** List a directory → [{ name, path, sha, size }]. Empty array if it doesn't exist. */
export async function listDir(path) {
  const data = await ghContents(path);
  if (!data) return [];
  return (Array.isArray(data) ? data : [data]).map((e) => ({ name: e.name, path: e.path, sha: e.sha, size: e.size }));
}

/** Read a file's decoded text → string, or null if missing. */
export async function getText(path) {
  const data = await ghContents(path);
  if (!data || Array.isArray(data)) return null;
  return Buffer.from(data.content || '', 'base64').toString('utf8');
}

/** Read + parse a JSON file → { json, sha }, or null if missing. */
export async function getJson(path) {
  const data = await ghContents(path);
  if (!data || Array.isArray(data)) return null;
  const text = Buffer.from(data.content || '', 'base64').toString('utf8');
  return { json: JSON.parse(text), sha: data.sha };
}

/** Create or update a JSON file. Pass `sha` to update; omit to create. */
export async function putJson(path, obj, message, sha) {
  const { token, repo, branch } = cfg();
  const url = `${API}/repos/${repo}/contents/${path}`;
  const body = {
    message,
    branch,
    content: Buffer.from(JSON.stringify(obj, null, 2) + '\n', 'utf8').toString('base64'),
  };
  if (sha) body.sha = sha;
  const r = await fetch(url, { method: 'PUT', headers: ghHeaders(token), body: JSON.stringify(body) });
  if (!r.ok) throw new Error(`GitHub PUT ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

/** Delete a file by sha. */
export async function deleteFile(path, message, sha) {
  const { token, repo, branch } = cfg();
  const url = `${API}/repos/${repo}/contents/${path}`;
  const r = await fetch(url, {
    method: 'DELETE',
    headers: ghHeaders(token),
    body: JSON.stringify({ message, branch, sha }),
  });
  if (!r.ok) throw new Error(`GitHub DELETE ${path}: ${r.status} ${await r.text()}`);
  return r.json();
}

// GET /api/ab-results — aggregated counts of the homepage A/B test for the
// admin (admin/netlify/functions/ab-results.mjs proxies here). Requires the
// header `x-ab-key` to match the AB_RESULTS_KEY environment variable, which
// must be set to the same value on this site and on the admin site.
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const secret = process.env.AB_RESULTS_KEY;
  if (!secret || req.headers.get('x-ab-key') !== secret) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const { blobs } = await getStore('ab-home').list();

  // totals[variant][device][event] and days[day][variant][device][event]
  const totals = {};
  const days = {};
  const bump = (obj, path) => {
    let node = obj;
    for (const part of path.slice(0, -1)) node = node[part] ??= {};
    const last = path[path.length - 1];
    node[last] = (node[last] || 0) + 1;
  };
  for (const { key } of blobs) {
    const [day, variant, device, event] = key.split('/');
    if (!day || !variant || !device || !event) continue;
    bump(totals, [variant, device, event]);
    bump(days, [day, variant, device, event]);
  }
  const sortedDays = Object.keys(days).sort();

  return Response.json(
    {
      generatedAt: new Date().toISOString(),
      firstDay: sortedDays[0] ?? null,
      lastDay: sortedDays[sortedDays.length - 1] ?? null,
      events: blobs.length,
      totals,
      days,
    },
    { headers: { 'cache-control': 'no-store' } },
  );
};

export const config = { path: '/api/ab-results' };

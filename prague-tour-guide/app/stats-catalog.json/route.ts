/**
 * /stats-catalog.json — titles of tours and journal articles for the admin
 * dashboard "Kliky a poptávky" (admin/src/components/admin/stats/). Generated
 * at build time from the site data, so new articles show up after a deploy.
 * `aliases` are the English URL slugs; the dashboard counts them as the
 * German page.
 */
import { blogPosts } from '../../src/utils/blogData';
import { tours } from '../../src/data/tours';
import { translate } from '../../src/utils/translations';
import { postText } from '../../src/utils/postText';

export const dynamic = 'force-static';

/** German text where it exists, English otherwise; tags and line breaks removed. */
function text(key: string, lookup: (key: string, lang: 'de' | 'en') => string = (k, l) => translate(k as any, l)): string {
  const de = lookup(key, 'de');
  const value = de && de !== key ? de : lookup(key, 'en');
  return value === key ? '' : value.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

export function GET() {
  const catalog = {
    tours: tours.map((tour) => ({
      slug: tour.slugDe,
      title: text(`tour.${tour.id}.shortTitle`) || text(tour.titleKey),
      aliases: tour.slug !== tour.slugDe ? [tour.slug] : [],
    })),
    articles: blogPosts
      .map((post) => {
        const slug = post.slugDe ?? post.slug;
        return {
          slug,
          title: text(post.titleKey, postText) || slug,
          cat: post.category ?? post.tagsDe?.[0] ?? post.tags[0] ?? '',
          date: post.date,
          aliases: slug !== post.slug ? [post.slug] : [],
        };
      })
      .sort((a, b) => b.date.localeCompare(a.date)),
  };
  return Response.json(catalog);
}

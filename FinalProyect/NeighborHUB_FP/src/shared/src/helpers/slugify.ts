const COMBINING_MARKS = /[̀-ͯ]/g;

export const slugify = (input: string): string =>
  input
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

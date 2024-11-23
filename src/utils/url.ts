import { parse, stringify } from 'query-string';

export const setUrlParams = (params: [string, string][], basePath = '/') => {
  if (!Array.isArray(params) || params.length === 0) return;

  const qs = parse(window.location.search);

  params.forEach((param) => {
    qs[param[0]] = param[1];
  });

  window.history.replaceState(null, '', `${basePath}?${stringify(qs)}`);
};

export const removeUrlParams = (params: string[], basePath = '/') => {
  if (!Array.isArray(params) || params.length === 0) return;

  const qs = parse(window.location.search);

  params.forEach((param) => {
    delete qs[param];
  });

  const str = stringify(qs);

  window.history.replaceState(null, '', str ? `${basePath}?${str}` : basePath);
};

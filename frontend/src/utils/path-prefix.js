const usePathPrefix = (path) => {
  if (process.env.BUILD_MODE !== 'production') return path;

  let pathPrefix = process.env.PATH_PREFIX;
  if (pathPrefix.length > 1) {
    if (pathPrefix.at(-1) === '/') pathPrefix = pathPrefix.slice(0, -1);
    return pathPrefix + path;
  }
  return path;
};

const removePathPrefix = (path) => {
  if (process.env.BUILD_MODE !== 'production') return path;

  let pathPrefix = process.env.PATH_PREFIX;
  if (pathPrefix.length > 1) {
    if (pathPrefix.at(-1) === '/') pathPrefix = pathPrefix.slice(0, -1);
    return path.replace(pathPrefix, '');
  }
  return path;
};

export { usePathPrefix, removePathPrefix };

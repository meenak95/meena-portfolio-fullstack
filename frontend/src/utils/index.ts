export const createPageUrl = (pageName: string): string => {
  const pageMap: { [key: string]: string } = {
    'Portfolio': '#/',
    'About': '#/about',
    'Skills': '#/skills',
    'Experience': '#/experience',
    'Contact': '#/contact'
  };
  
  return pageMap[pageName] || '#/';
};

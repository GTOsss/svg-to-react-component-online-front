const size = {
  mobil: '576px',
  tablet: '768px',
  desktop: '1024px',
  extra: '1860px',
};

export default {
  mobil: `(min-width: ${size.mobil})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  extra: `(min-width: ${size.extra})`,
};

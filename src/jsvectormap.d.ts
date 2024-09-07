declare module 'jsvectormap' {
  const jsVectorMap: any;
  export default jsVectorMap;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.js' {
  const content: any;
  export default content;
}

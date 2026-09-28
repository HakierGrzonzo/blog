import type { MDXComponents } from "mdx/types";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

const components: MDXComponents = {
  code: (props) => <code {...props} className="codehilte" />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}

declare module 'markdown-styles' {
  type ResolveArgsOptions = {
    input: string;
    output: string;
    layout: string;
  };

  type RenderOptions = {
    input: string;
    output: string;
    layout: string;
  };
  type MarkdownStyles = {
    resolveArgs(options: ResolveArgsOptions): ResolveArgsOptions;
    render(options: RenderOptions, callback: () => void): void;
  };

  const mds: MarkdownStyles;

  export default mds;
}

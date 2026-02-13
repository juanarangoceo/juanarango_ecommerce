import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CopyableCodeBlock } from "@/components/blog/CopyableCodeBlock";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none
        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-900
        prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
        prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-semibold
        prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
        prose-ul:list-disc prose-ul:pl-6
        prose-li:marker:text-green-500
    ">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                h1: ({node, ...props}) => {
                    return <h2 className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white" {...props}>{props.children}</h2>;
                },
                h2: ({node, ...props}) => {
                    return <h2 className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white" {...props}>{props.children}</h2>;
                },
                h3: ({node, ...props}) => {
                    return <h3 className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100" {...props}>{props.children}</h3>;
                },
                p: ({node, ...props}) => {
                    return <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</p>;
                },
                ul: ({node, ...props}) => {
                    return <ul className="my-6 space-y-2 pl-6 list-disc text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</ul>;
                },
                ol: ({node, ...props}) => {
                    return <ol className="my-6 space-y-2 pl-6 list-decimal text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</ol>;
                },
                li: ({node, ...props}) => {
                    return <li className="mb-2" {...props}>{props.children}</li>;
                },
                strong: ({node, ...props}) => {
                    return <strong className="font-bold text-zinc-900 dark:text-white" {...props}>{props.children}</strong>;
                },
                blockquote: ({node, ...props}) => {
                    return <blockquote className="border-l-4 border-green-500 bg-zinc-50 dark:bg-zinc-900 py-3 px-6 my-8 rounded-r-lg italic text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</blockquote>;
                },
                table: ({node, ...props}) => {
                    return <div className="overflow-x-auto my-8 rounded-lg border border-zinc-200 dark:border-zinc-800"><table className="w-full text-left text-sm" {...props}>{props.children}</table></div>;
                },
                thead: ({node, ...props}) => {
                    return <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold" {...props}>{props.children}</thead>;
                },
                tbody: ({node, ...props}) => {
                    return <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props}>{props.children}</tbody>;
                },
                tr: ({node, ...props}) => {
                    return <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" {...props}>{props.children}</tr>;
                },
                th: ({node, ...props}) => {
                    return <th className="px-4 py-3" {...props}>{props.children}</th>;
                },
                td: ({node, ...props}) => {
                    return <td className="px-4 py-3" {...props}>{props.children}</td>;
                },
                code: ({node, className, children, ...props}: any) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !String(children).includes('\n');
                    
                    if (isInline) {
                        return <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>{children}</code>;
                    }

                    return (
                        <div className="relative my-8 rounded-lg overflow-hidden">
                            <div className="absolute right-2 top-2 z-10">
                                <CopyableCodeBlock 
                                    title={match?.[1] || 'Code'} 
                                    language={match?.[1] || 'text'} 
                                    code={String(children).replace(/\n$/, '')} 
                                />
                            </div>
                        </div>
                    );
                }
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
  );
}

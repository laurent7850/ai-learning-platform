"use client";

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  // Simple markdown-like rendering
  // In production, you'd use a proper markdown parser like react-markdown
  const renderContent = (text: string) => {
    return text
      .split("\n\n")
      .map((paragraph, index) => {
        // Headers
        if (paragraph.startsWith("# ")) {
          return (
            <h1 key={index} className="text-3xl font-bold mb-6 mt-8 first:mt-0">
              {paragraph.slice(2)}
            </h1>
          );
        }
        if (paragraph.startsWith("## ")) {
          return (
            <h2 key={index} className="text-2xl font-semibold mb-4 mt-6">
              {paragraph.slice(3)}
            </h2>
          );
        }
        if (paragraph.startsWith("### ")) {
          return (
            <h3 key={index} className="text-xl font-medium mb-3 mt-4">
              {paragraph.slice(4)}
            </h3>
          );
        }

        // Blockquote
        if (paragraph.startsWith("> ")) {
          return (
            <blockquote
              key={index}
              className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
            >
              {paragraph.slice(2)}
            </blockquote>
          );
        }

        // Code block
        if (paragraph.startsWith("```")) {
          const lines = paragraph.split("\n");
          const code = lines.slice(1, -1).join("\n");
          return (
            <pre
              key={index}
              className="bg-muted p-4 rounded-lg overflow-x-auto mb-4 text-sm"
            >
              <code>{code}</code>
            </pre>
          );
        }

        // List
        if (paragraph.startsWith("- ") || paragraph.startsWith("* ")) {
          const items = paragraph.split("\n").map((item) => item.slice(2));
          return (
            <ul key={index} className="mb-4 pl-6 list-disc space-y-2">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (/^\d+\. /.test(paragraph)) {
          const items = paragraph.split("\n").map((item) => item.replace(/^\d+\. /, ""));
          return (
            <ol key={index} className="mb-4 pl-6 list-decimal space-y-2">
              {items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          );
        }

        // Regular paragraph with inline formatting
        const formattedText = paragraph
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/`(.*?)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary underline underline-offset-2 hover:no-underline">$1</a>');

        return (
          <p
            key={index}
            className="mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      });
  };

  return <div className="prose-course">{renderContent(content)}</div>;
}

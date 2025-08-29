"use client";

import React, { useEffect, useState } from 'react';

interface Post {
  id: string;
  title?: string;
  content: any;
  createdAt?: string;
  updatedAt?: string;
}

interface RichTextRendererProps {
  content: any;
  className?: string;
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({ 
  content, 
  className = "richtext-content" 
}) => {
  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper function to get file icon
  const getFileIcon = (mimeType: string, fileName: string): string => {
    if (mimeType?.includes('pdf') || fileName?.endsWith('.pdf')) return '📄';
    if (mimeType?.includes('word') || fileName?.match(/\.(doc|docx)$/i)) return '📝';
    if (mimeType?.includes('excel') || fileName?.match(/\.(xls|xlsx)$/i)) return '📊';
    if (mimeType?.includes('powerpoint') || fileName?.match(/\.(ppt|pptx)$/i)) return '📽️';
    if (mimeType?.includes('text') || fileName?.match(/\.(txt|md)$/i)) return '📃';
    if (mimeType?.includes('zip') || fileName?.match(/\.(zip|rar|7z)$/i)) return '📦';
    if (mimeType?.includes('audio') || fileName?.match(/\.(mp3|wav|ogg)$/i)) return '🎵';
    if (mimeType?.includes('video') || fileName?.match(/\.(mp4|avi|mov)$/i)) return '🎬';
    return '📎';
  };

  // Helper function to get file type label
  const getFileTypeLabel = (mimeType: string, fileName: string): string => {
    if (mimeType?.includes('pdf')) return 'PDF Document';
    if (mimeType?.includes('word')) return 'Word Document';
    if (mimeType?.includes('excel')) return 'Excel Spreadsheet';
    if (mimeType?.includes('powerpoint')) return 'PowerPoint Presentation';
    if (mimeType?.includes('text')) return 'Text Document';
    if (mimeType?.includes('zip')) return 'Archive File';
    if (mimeType?.includes('audio')) return 'Audio File';
    if (mimeType?.includes('video')) return 'Video File';
    
    const ext = fileName?.split('.').pop()?.toUpperCase();
    return ext ? `${ext} File` : 'Document';
  };

  // Helper functions for file extension based detection
  const getFileIconByExtension = (ext: string): string => {
    switch (ext?.toLowerCase()) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'xls': case 'xlsx': return '📊';
      case 'ppt': case 'pptx': return '📽️';
      case 'txt': case 'md': return '📃';
      case 'zip': case 'rar': case '7z': return '📦';
      case 'mp3': case 'wav': case 'ogg': return '🎵';
      case 'mp4': case 'avi': case 'mov': return '🎬';
      default: return '📎';
    }
  };

  const getFileTypeLabelByExtension = (ext: string): string => {
    switch (ext?.toLowerCase()) {
      case 'pdf': return 'PDF Document';
      case 'doc': case 'docx': return 'Word Document';
      case 'xls': case 'xlsx': return 'Excel Spreadsheet';
      case 'ppt': case 'pptx': return 'PowerPoint Presentation';
      case 'txt': return 'Text Document';
      case 'md': return 'Markdown Document';
      case 'zip': case 'rar': case '7z': return 'Archive File';
      case 'mp3': case 'wav': case 'ogg': return 'Audio File';
      case 'mp4': case 'avi': case 'mov': return 'Video File';
      default: return `${ext?.toUpperCase()} File`;
    }
  };

  // Main function to convert Lexical to HTML
  const lexicalToHtml = (lexicalData: any): string => {
    if (!lexicalData?.root?.children) {
      return '<p>No content available</p>';
    }

    const processNode = (node: any): string => {
      if (!node) return '';

      switch (node.type) {
        case 'paragraph':
          const pContent = node.children?.map(processNode).join('') || '';
          return pContent ? `<p>${pContent}</p>` : '';
        
        case 'heading':
          const level = node.tag || '1';
          const hContent = node.children?.map(processNode).join('') || '';
          return hContent ? `<h${level}>${hContent}</h${level}>` : '';
        
        case 'text':
          let text = node.text || '';
          if (!text) return '';
          
          // Apply formatting
          if (node.format) {
            if (node.format & 1) text = `<strong>${text}</strong>`; // bold
            if (node.format & 2) text = `<em>${text}</em>`; // italic
            if (node.format & 4) text = `<u>${text}</u>`; // underline
            if (node.format & 8) text = `<s>${text}</s>`; // strikethrough
          }
          return text;
        
        case 'list':
          const listTag = node.listType === 'number' ? 'ol' : 'ul';
          const listContent = node.children?.map(processNode).join('') || '';
          return listContent ? `<${listTag}>${listContent}</${listTag}>` : '';
        
        case 'listitem':
          const liContent = node.children?.map(processNode).join('') || '';
          return liContent ? `<li>${liContent}</li>` : '';
        
        case 'quote':
          const quoteContent = node.children?.map(processNode).join('') || '';
          return quoteContent ? `<blockquote>${quoteContent}</blockquote>` : '';
        
        case 'link':
          const linkContent = node.children?.map(processNode).join('') || '';
          const url = node.url || '#';
          const target = node.newTab ? ' target="_blank" rel="noopener noreferrer"' : '';
          
          // Check if it's a file link
          const isFileLink = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|7z|mp3|wav|mp4|avi)$/i.test(url);
          
          if (isFileLink && linkContent) {
            const fileName = url.split('/').pop() || linkContent;
            const fileExt = fileName.split('.').pop()?.toLowerCase() || '';
            const fileIcon = getFileIconByExtension(fileExt);
            const fileTypeLabel = getFileTypeLabelByExtension(fileExt);
            
            return `
              <div class="file-card" style="
                border: 1px solid #e5e7eb; 
                border-radius: 8px; 
                padding: 1em; 
                margin: 1em 0; 
                background: #f9fafb;
                display: flex;
                align-items: center;
                gap: 12px;
              ">
                <div style="font-size: 2em;">${fileIcon}</div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 4px;">
                    <a href="${url}" class="file-link"${target}>
                      ${linkContent}
                    </a>
                  </div>
                  <div style="font-size: 0.875em; color: #6b7280;">
                    ${fileTypeLabel}
                  </div>
                </div>
                <div>
                  <a href="${url}" class="file-download-btn"${target} download>
                    Download
                  </a>
                </div>
              </div>
            `;
          } else {
            return linkContent ? `<a href="${url}" class="file-link"${target}>${linkContent}</a>` : '';
          }
        
        case 'linebreak':
          return '<br>';
        
        case 'upload':
          // Handle uploads từ Payload CMS (images, documents, etc.)
          let uploadData = node.value || node;
          let fileUrl = '';
          let fileName = '';
          let fileType = '';
          let altText = 'File';
          let caption = '';
          
          // Process different upload node structures
          if (uploadData.url) {
            fileUrl = uploadData.url;
          } else if (uploadData.filename) {
            fileUrl = `/media/${uploadData.filename}`;
          }
          
          fileName = uploadData.filename || uploadData.name || 'Download File';
          fileType = uploadData.mimeType || uploadData.type || '';
          
          if (uploadData.alt) altText = uploadData.alt;
          if (uploadData.caption) caption = uploadData.caption;
          
          if (fileUrl) {
            // Check if it's an image
            const isImage = fileType.startsWith('image/') || 
                          /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName);
            // Check if it's an video
             const isVideo = fileType.startsWith('video/') || /\.(mp4|webm|ogg)$/i.test(fileName);
            
            if (isImage) {
              // Handle images
              let imgHtml = `<img src="${fileUrl}" alt="${altText}" style="max-width: 100%; height: auto; margin: 1em 0;" loading="lazy" />`;
              if (caption) {
                imgHtml = `<figure style="margin: 1em 0;">
                  ${imgHtml}
                  <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                    ${caption}
                  </figcaption>
                </figure>`;
              }
              return imgHtml;
            }
            else if(isVideo){

              //Display video
              let videoHtml = `<video controls style="max-width: 100%; height: auto; margin: 1em 0;">
                <source src="${fileUrl}" type="${fileType || 'video/mp4'}" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>`;
              
              if (caption) {
                videoHtml = `<figure style="margin: 1em 0;">
                  ${videoHtml}
                  <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                    ${caption}
                  </figcaption>
                </figure>`;
              }

              return videoHtml;
            }
            else {
              // Handle documents
              const fileSize = uploadData.filesize ? formatFileSize(uploadData.filesize) : '';
              const fileIcon = getFileIcon(fileType, fileName);
              
              let fileHtml = `
                <div class="file-card" style="
                  border: 1px solid #e5e7eb; 
                  border-radius: 8px; 
                  padding: 1em; 
                  margin: 1em 0; 
                  background: #f9fafb;
                  display: flex;
                  align-items: center;
                  gap: 12px;
                ">
                  <div style="font-size: 2em;">${fileIcon}</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 600; margin-bottom: 4px;">
                      <a href="${fileUrl}" target="_blank" rel="noopener noreferrer" class="file-link">
                        ${fileName}
                      </a>
                    </div>
                    <div style="font-size: 0.875em; color: #6b7280;">
                      ${getFileTypeLabel(fileType, fileName)}
                      ${fileSize ? ` • ${fileSize}` : ''}
                    </div>
                    ${caption ? `<div style="font-size: 0.875em; color: #6b7280; margin-top: 4px; font-style: italic;">${caption}</div>` : ''}
                  </div>
                  <div>
                    <a href="${fileUrl}" download="${fileName}" class="file-download-btn">
                      Download
                    </a>
                  </div>
                </div>
              `;
              
              return fileHtml;
            }
          }
          return '';
        
        case 'image':
          // Alternative image node type
          const imgSrc = node.src || node.url;
          const imgAlt = node.alt || 'Image';
          const imgCaption = node.caption;
          
          if (imgSrc) {
            let imageHtml = `<img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; height: auto; margin: 1em 0;" loading="lazy" />`;
            if (imgCaption) {
              imageHtml = `<figure style="margin: 1em 0;">
                ${imageHtml}
                <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                  ${imgCaption}
                </figcaption>
              </figure>`;
            }
            return imageHtml;
          }
          return '';
        
        case 'horizontalrule':
        case 'horizontalRule':
          return '<hr style="margin: 2em 0; border: none; border-top: 1px solid #ddd;" />';
        
        case 'code':
          const codeText = node.children?.map(processNode).join('') || node.text || '';
          return codeText ? `<code style="background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">${codeText}</code>` : '';
        
        case 'codeblock':
          const codeBlockText = node.children?.map(processNode).join('') || node.text || '';
          const language = node.language ? ` class="language-${node.language}"` : '';
          return codeBlockText ? `<pre style="background: #f5f5f5; padding: 1em; border-radius: 5px; overflow-x: auto; margin: 1em 0;"><code${language}>${codeBlockText}</code></pre>` : '';
        
        default:
          // Handle unknown types
          console.log('Unknown node type:', node.type, node);
          if (node.children?.length) {
            return node.children.map(processNode).join('');
          }
          if (node.text) {
            return node.text;
          }
          return '';
      }
    };

    try {
      return lexicalData.root.children.map(processNode).join('');
    } catch (error) {
      console.error('Error parsing Lexical data:', error);
      return '<p>Error parsing content</p>';
    }
  };

  if (!content) {
    return <div className="text-gray-500 italic">No content available</div>;
  }

  const htmlContent = lexicalToHtml(content);

  return (
    <>
      <div 
        className={className}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      
      {/* CSS Styles */}
      <style jsx>{`
        .${className} {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.6;
          color: #333;
          word-wrap: break-word;
        }
        
        .${className} img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 1.5em 0;
        }
        
        .${className} figure {
          margin: 1.5em 0;
          text-align: center;
        }
        
        .${className} figcaption {
          margin-top: 0.5em;
          font-size: 0.9em;
          color: #666;
          font-style: italic;
        }
        
        .${className} blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1em;
          margin: 1.5em 0;
          font-style: italic;
          color: #6b7280;
        }
        
        .${className} code {
          background: #f3f4f6;
          padding: 0.2em 0.4em;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
          font-size: 0.9em;
        }
        
        .${className} pre {
          background: #f3f4f6;
          padding: 1em;
          border-radius: 8px;
          overflow-x: auto;
          margin: 1.5em 0;
          border: 1px solid #e5e7eb;
        }
        
        .${className} hr {
          margin: 2em 0;
          border: none;
          border-top: 1px solid #e5e7eb;
        }
        
        .${className} ul, .${className} ol {
          margin: 1em 0;
          padding-left: 2em;
        }
        
        .${className} li {
          margin-bottom: 0.5em;
        }
        
        .${className} h1, .${className} h2, .${className} h3,
        .${className} h4, .${className} h5, .${className} h6 {
          margin-top: 1.5em;
          margin-bottom: 0.5em;
          font-weight: 600;
        }
        
        .${className} p {
          margin-bottom: 1em;
        }
        
        /* File styling */
        .${className} .file-card {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 1em;
          margin: 1em 0;
          background: #f9fafb;
          transition: all 0.2s ease;
        }
        
        .${className} .file-card:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }
        
        .${className} .file-download-btn {
          background: #3b82f6;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 0.875em;
          display: inline-block;
          transition: background-color 0.2s ease;
        }
        
        .${className} .file-download-btn:hover {
          background: #2563eb;
          color: white;
          text-decoration: none;
        }
        
        .${className} .file-link {
          color: #3b82f6;
          text-decoration: none;
        }
        
        .${className} .file-link:hover {
          color: #2563eb;
          text-decoration: underline;
        }
        
        .${className} a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        .${className} a:hover {
          color: #1d4ed8;
        }
      `}</style>
    </>
  );
};

// Component chính để fetch và hiển thị posts
export const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getPost = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/posts');
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      console.log('Fetched data:', data);
      
      if (data?.docs?.[0]) {
        setPost(data.docs[0]);
      } else {
        setError('No posts found');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  if (!post) {
    return <div className="p-4 text-gray-600">No post found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {post.title && (
        <h1 className="text-3xl font-bold mb-6 text-gray-900 border-b pb-4">
          {post.title}
        </h1>
      )}
      
      <article className="prose prose-lg max-w-none">
        <RichTextRenderer content={post.content} />
      </article>
      
      {/* Debug info - chỉ hiển thị trong development */}
      {process.env.NODE_ENV === 'development' && post.content && (
        <details className="mt-8 p-4 bg-gray-50 border rounded-lg">
          <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
            🔍 Debug: Raw Lexical Data
          </summary>
          <div className="mt-3">
            <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
              {JSON.stringify(post.content, null, 2)}
            </pre>
          </div>
        </details>
      )}
    </div>
  );
};

// Export utility function để sử dụng riêng lẻ
export const renderLexicalContent = (content: any, className?: string) => {
  return <RichTextRenderer content={content} className={className} />;
};
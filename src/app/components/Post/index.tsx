'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Calendar, Download } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollToTop } from '../scroll-to-top'

interface Post {
	id: string
	title?: string
	content: any
	publishedAt?: string
	categories?:
		| Array<{
				id: string
				title?: string
				name?: string
		  }>
		| string[]
	createdAt?: string
	updatedAt?: string
}

interface RichTextRendererProps {
	content: any
	className?: string
}

// Helper function to format file size
const formatFileSize = (size: string | number) => {
	if (typeof size === 'string') return size

	if (size === 0) return '0 Bytes'
	const k = 1024
	const sizes = ['Bytes', 'KB', 'MB', 'GB']
	const i = Math.floor(Math.log(size) / Math.log(k))
	return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const RichTextRenderer: React.FC<RichTextRendererProps> = ({
	content,
	className = 'richtext-content'
}) => {
	// Helper function to get file icon
	const getFileIcon = (mimeType: string, fileName: string): string => {
		if (mimeType?.includes('pdf') || fileName?.endsWith('.pdf')) return '📄'
		if (mimeType?.includes('word') || fileName?.match(/\.(doc|docx)$/i))
			return '📝'
		if (mimeType?.includes('excel') || fileName?.match(/\.(xls|xlsx)$/i))
			return '📊'
		if (
			mimeType?.includes('powerpoint') ||
			fileName?.match(/\.(ppt|pptx)$/i)
		)
			return '📽️'
		if (mimeType?.includes('text') || fileName?.match(/\.(txt|md)$/i))
			return '📃'
		if (mimeType?.includes('zip') || fileName?.match(/\.(zip|rar|7z)$/i))
			return '📦'
		if (mimeType?.includes('audio') || fileName?.match(/\.(mp3|wav|ogg)$/i))
			return '🎵'
		if (mimeType?.includes('video') || fileName?.match(/\.(mp4|avi|mov)$/i))
			return '🎬'
		return '📎'
	}

	// Helper function to get file type label
	const getFileTypeLabel = (mimeType: string, fileName: string): string => {
		if (mimeType?.includes('pdf')) return 'PDF Document'
		if (mimeType?.includes('word')) return 'Word Document'
		if (mimeType?.includes('excel')) return 'Excel Spreadsheet'
		if (mimeType?.includes('powerpoint')) return 'PowerPoint Presentation'
		if (mimeType?.includes('text')) return 'Text Document'
		if (mimeType?.includes('zip')) return 'Archive File'
		if (mimeType?.includes('audio')) return 'Audio File'
		if (mimeType?.includes('video')) return 'Video File'

		const ext = fileName?.split('.').pop()?.toUpperCase()
		return ext ? `${ext} File` : 'Document'
	}

	// Helper functions for file extension based detection
	const getFileIconByExtension = (ext: string): string => {
		switch (ext?.toLowerCase()) {
			case 'pdf':
				return '📄'
			case 'doc':
			case 'docx':
				return '📝'
			case 'xls':
			case 'xlsx':
				return '📊'
			case 'ppt':
			case 'pptx':
				return '📽️'
			case 'txt':
			case 'md':
				return '📃'
			case 'zip':
			case 'rar':
			case '7z':
				return '📦'
			case 'mp3':
			case 'wav':
			case 'ogg':
				return '🎵'
			case 'mp4':
			case 'avi':
			case 'mov':
				return '🎬'
			default:
				return '📎'
		}
	}

	const getFileTypeLabelByExtension = (ext: string): string => {
		switch (ext?.toLowerCase()) {
			case 'pdf':
				return 'PDF Document'
			case 'doc':
			case 'docx':
				return 'Word Document'
			case 'xls':
			case 'xlsx':
				return 'Excel Spreadsheet'
			case 'ppt':
			case 'pptx':
				return 'PowerPoint Presentation'
			case 'txt':
				return 'Text Document'
			case 'md':
				return 'Markdown Document'
			case 'zip':
			case 'rar':
			case '7z':
				return 'Archive File'
			case 'mp3':
			case 'wav':
			case 'ogg':
				return 'Audio File'
			case 'mp4':
			case 'avi':
			case 'mov':
				return 'Video File'
			default:
				return `${ext?.toUpperCase()} File`
		}
	}

	// Main function to convert Lexical to HTML
	const lexicalToHtml = (lexicalData: any): string => {
		console.log('lexicalData:', lexicalData) // Debug log
		const processNode = (node: any): string => {
			if (!node) return ''

			console.log('Processing node:', node.type, node) // Debug log

			switch (node.type) {
				case 'paragraph':
					const pContent =
						node.children?.map(processNode).join('') || ''
					return pContent ? `<p>${pContent}</p>` : ''

				case 'heading':
					const level = node.tag?.replace('h', '') || '1'
					const hContent =
						node.children?.map(processNode).join('') || ''
					return hContent ? `<h${level}>${hContent}</h${level}>` : ''

				case 'text':
					let text = node.text || ''
					if (!text) return ''

					// Apply formatting - check if format is array or number
					if (node.format) {
						if (Array.isArray(node.format)) {
							if (node.format.includes('bold'))
								text = `<strong>${text}</strong>`
							if (node.format.includes('italic'))
								text = `<em>${text}</em>`
							if (node.format.includes('underline'))
								text = `<u>${text}</u>`
							if (node.format.includes('strikethrough'))
								text = `<s>${text}</s>`
						} else if (typeof node.format === 'number') {
							if (node.format & 1)
								text = `<strong>${text}</strong>` // bold
							if (node.format & 2) text = `<em>${text}</em>` // italic
							if (node.format & 4) text = `<u>${text}</u>` // underline
							if (node.format & 8) text = `<s>${text}</s>` // strikethrough
						}
					}

					// Handle text styles
					if (node.style) {
						text = `<span style="${node.style}">${text}</span>`
					}

					return text

				case 'list':
					const listTag = node.listType === 'number' ? 'ol' : 'ul'
					const listContent =
						node.children?.map(processNode).join('') || ''
					return listContent
						? `<${listTag}>${listContent}</${listTag}>`
						: ''

				case 'listitem':
					const liContent =
						node.children?.map(processNode).join('') || ''
					return liContent ? `<li>${liContent}</li>` : ''

				case 'quote':
					const quoteContent =
						node.children?.map(processNode).join('') || ''
					return quoteContent
						? `<blockquote>${quoteContent}</blockquote>`
						: ''

				case 'link':
					const linkContent =
						node.children?.map(processNode).join('') || ''
					const url = node.url || '#'
					const target = node.newTab
						? ' target="_blank" rel="noopener noreferrer"'
						: ''

					// Check if it's a file link
					const isFileLink =
						/\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|zip|rar|7z|mp3|wav|mp4|avi)$/i.test(
							url
						)

					if (isFileLink && linkContent) {
						const fileName = url.split('/').pop() || linkContent
						const fileExt =
							fileName.split('.').pop()?.toLowerCase() || ''
						const fileIcon = getFileIconByExtension(fileExt)
						const fileTypeLabel =
							getFileTypeLabelByExtension(fileExt)

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
            `
					} else {
						return linkContent
							? `<a href="${url}" class="file-link"${target}>${linkContent}</a>`
							: ''
					}

				case 'linebreak':
					return '<br>'

				case 'upload':
					// Handle uploads từ Payload CMS (images, documents, etc.)
					let uploadData = node.value || node
					let fileUrl = ''
					let fileName = ''
					let fileType = ''
					let altText = 'File'
					let caption = ''

					// Process different upload node structures
					if (uploadData.url) {
						fileUrl = uploadData.url
					} else if (uploadData.filename) {
						fileUrl = `/media/${uploadData.filename}`
					}

					fileName =
						uploadData.filename ||
						uploadData.name ||
						'Download File'
					fileType = uploadData.mimeType || uploadData.type || ''

					if (uploadData.alt) altText = uploadData.alt
					if (uploadData.caption) caption = uploadData.caption

					if (fileUrl) {
						// Check if it's an image
						const isImage =
							fileType.startsWith('image/') ||
							/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(fileName)
						// Check if it's an video
						const isVideo =
							fileType.startsWith('video/') ||
							/\.(mp4|webm|ogg)$/i.test(fileName)

						if (isImage) {
							// Handle images
							let imgHtml = `<img src="${fileUrl}" alt="${altText}" style="max-width: 100%; height: auto; margin: 1em 0;" loading="lazy" />`
							if (caption) {
								imgHtml = `<figure style="margin: 1em 0;">
                  ${imgHtml}
                  <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                    ${caption}
                  </figcaption>
                </figure>`
							}
							return imgHtml
						} else if (isVideo) {
							//Display video
							let videoHtml = `<video controls style="max-width: 100%; height: auto; margin: 1em 0;">
                <source src="${fileUrl}" type="${fileType || 'video/mp4'}" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>`

							if (caption) {
								videoHtml = `<figure style="margin: 1em 0;">
                  ${videoHtml}
                  <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                    ${caption}
                  </figcaption>
                </figure>`
							}

							return videoHtml
						} else {
							// Handle documents
							const fileSize = uploadData.filesize
								? formatFileSize(uploadData.filesize)
								: ''
							const fileIcon = getFileIcon(fileType, fileName)

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
              `

							return fileHtml
						}
					}
					return ''

				case 'image':
					// Alternative image node type
					const imgSrc = node.src || node.url
					const imgAlt = node.alt || 'Image'
					const imgCaption = node.caption

					if (imgSrc) {
						let imageHtml = `<img src="${imgSrc}" alt="${imgAlt}" style="max-width: 100%; height: auto; margin: 1em 0;" loading="lazy" />`
						if (imgCaption) {
							imageHtml = `<figure style="margin: 1em 0;">
                ${imageHtml}
                <figcaption style="text-align: center; font-style: italic; color: #666; font-size: 0.9em; margin-top: 0.5em;">
                  ${imgCaption}
                </figcaption>
              </figure>`
						}
						return imageHtml
					}
					return ''

				case 'horizontalrule':
				case 'horizontalRule':
					return '<hr style="margin: 2em 0; border: none; border-top: 1px solid #ddd;" />'

				case 'code':
					const codeText =
						node.children?.map(processNode).join('') ||
						node.text ||
						''
					return codeText
						? `<code style="background: #f5f5f5; padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace;">${codeText}</code>`
						: ''

				case 'codeblock':
					const codeBlockText =
						node.children?.map(processNode).join('') ||
						node.text ||
						''
					const language = node.language
						? ` class="language-${node.language}"`
						: ''
					return codeBlockText
						? `<pre style="background: #f5f5f5; padding: 1em; border-radius: 5px; overflow-x: auto; margin: 1em 0;"><code${language}>${codeBlockText}</code></pre>`
						: ''

				default:
					// Handle unknown types
					console.log('Unknown node type:', node.type, node)
					if (node.children?.length) {
						return node.children.map(processNode).join('')
					}
					if (node.text) {
						return node.text
					}
					return ''
			}
		}

		// Handle different content structures
		if (!lexicalData) {
			return '<p>No content available</p>'
		}

		// If content is a string, return it directly
		if (typeof lexicalData === 'string') {
			return `<p>${lexicalData}</p>`
		}

		// Handle array of content blocks
		if (Array.isArray(lexicalData)) {
			return lexicalData.map(processNode).join('')
		}

		// Handle Lexical editor format
		if (!lexicalData.root && !lexicalData.children) {
			console.log('No root or children found in content')
			return '<p>No content available</p>'
		}

		// Handle different content structures
		if (!lexicalData) {
			return '<p>No content available</p>'
		}

		// If content is a string, return it directly
		if (typeof lexicalData === 'string') {
			return `<p>${lexicalData}</p>`
		}

		// Handle array of content blocks
		if (Array.isArray(lexicalData)) {
			return lexicalData.map(processNode).join('')
		}

		// Handle Lexical editor format
		if (!lexicalData.root && !lexicalData.children) {
			console.log('No root or children found in content')
			return '<p>No content available</p>'
		}

		try {
			// Handle different content structures
			if (lexicalData.root?.children) {
				return lexicalData.root.children.map(processNode).join('')
			} else if (lexicalData.children) {
				return lexicalData.children.map(processNode).join('')
			} else if (Array.isArray(lexicalData)) {
				return lexicalData.map(processNode).join('')
			} else {
				return processNode(lexicalData)
			}
		} catch (error) {
			console.error('Error parsing Lexical data:', error)
			return '<p>Error parsing content</p>'
		}
	}

	if (!content) {
		return <div className='text-gray-500 italic'>No content available</div>
	}

	// Debug: Log content structure
	console.log('Content being rendered:', content)

	const htmlContent = lexicalToHtml(content)
	console.log('Generated HTML:', htmlContent)

	return (
		<div className='richtext-wrapper'>
			<div
				className={className}
				dangerouslySetInnerHTML={{ __html: htmlContent }}
			/>

			{/* CSS Styles */}
			<style jsx>{`
				:global(.richtext-wrapper .${className}) {
					font-family:
						-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
						sans-serif;
					line-height: 1.6;
					color: #333;
					word-wrap: break-word;
				}

				:global(.richtext-wrapper .${className} h1),
				:global(.richtext-wrapper .${className} h2),
				:global(.richtext-wrapper .${className} h3) {
					margin-top: 1.5em;
					margin-bottom: 0.5em;
					font-weight: 600;
					line-height: 1.25;
				}

				:global(.richtext-wrapper .${className} ul) {
					list-style-type: disc !important; /* hiển thị chấm */
					margin: 1em 0;
					padding-left: 2em;
				}
				:global(.richtext-wrapper .${className} ol) {
					list-style-type: decimal !important;
					margin: 1em 0;
					padding-left: 2em;
				}

				:global(.richtext-wrapper .${className} li) {
					margin-bottom: 0.5em;
				}

				:global(.richtext-wrapper .${className} img) {
					max-width: 100%;
					height: auto;
					border-radius: 8px;
					box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
					margin: 1.5em 0;
				}

				:global(.richtext-wrapper .${className} figure) {
					margin: 1.5em 0;
					text-align: center;
				}

				:global(.richtext-wrapper .${className} figcaption) {
					margin-top: 0.5em;
					font-size: 0.9em;
					color: #666;
					font-style: italic;
				}

				:global(.richtext-wrapper .${className} blockquote) {
					border-left: 4px solid #e5e7eb;
					padding-left: 1em;
					margin: 1.5em 0;
					font-style: italic;
					color: #6b7280;
				}

				:global(.richtext-wrapper .${className} code) {
					background: #f3f4f6;
					padding: 0.2em 0.4em;
					border-radius: 3px;
					font-family: 'Courier New', monospace;
					font-size: 0.9em;
				}

				:global(.richtext-wrapper .${className} pre) {
					background: #f3f4f6;
					padding: 1em;
					border-radius: 8px;
					overflow-x: auto;
					margin: 1.5em 0;
					border: 1px solid #e5e7eb;
				}

				:global(.richtext-wrapper .${className} hr) {
					margin: 2em 0;
					border: none;
					border-top: 2px solid #e5e7eb;
					border-radius: 1px;
				}

				:global(.richtext-wrapper .${className} .file-card) {
					border: 1px solid #e5e7eb;
					border-radius: 8px;
					padding: 1em;
					margin: 1em 0;
					background: #f9fafb;
					transition: all 0.2s ease;
				}

				:global(.richtext-wrapper .${className} .file-card:hover) {
					background: #f3f4f6;
					border-color: #d1d5db;
				}

				:global(.richtext-wrapper .${className} .file-download-btn) {
					background: #3b82f6;
					color: white;
					padding: 8px 16px;
					border-radius: 6px;
					text-decoration: none;
					font-size: 0.875em;
					display: inline-block;
					transition: background-color 0.2s ease;
				}

				:global(
					.richtext-wrapper .${className} .file-download-btn:hover
				) {
					background: #2563eb;
					color: white;
					text-decoration: none;
				}

				:global(.richtext-wrapper .${className} .file-link) {
					color: #3b82f6;
					text-decoration: none;
				}

				:global(.richtext-wrapper .${className} .file-link:hover) {
					color: #2563eb;
					text-decoration: underline;
				}

				:global(.richtext-wrapper .${className} a) {
					color: #3b82f6;
					text-decoration: underline;
				}

				:global(.richtext-wrapper .${className} a:hover) {
					color: #1d4ed8;
				}

				:global(.richtext-wrapper .${className} strong) {
					font-weight: 600;
				}

				:global(.richtext-wrapper .${className} em) {
					font-style: italic;
				}

				:global(.richtext-wrapper .${className} u) {
					text-decoration: underline;
				}

				:global(.richtext-wrapper .${className} s) {
					text-decoration: line-through;
				}
			`}</style>
		</div>
	)
}

export default function PostDetailPage() {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [post, setPost] = useState<Post | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [category, setCategory] = useState(null)
	const [slug, setSlug] = useState(null)

	const id = searchParams.get('id')

	const getPost = async () => {
		if (!id) {
			setError('No post ID provided')
			setLoading(false)
			return
		}

		try {
			setLoading(true)
			setError(null)

			const res = await fetch('http://localhost:3000/api/posts')

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`)
			}

			const data = await res.json()
			console.log('Fetched data:', data)

			// Lọc bài viết theo id
			const filteredPosts = data.docs.filter(
				(post: { id: string | null }) => post.id == id
			)
			console.log('id:', id)
			console.log('filteredPosts:', filteredPosts)
			const slugData = filteredPosts[0]?.categories[0]?.slug
			setSlug(slugData)
			console.log('slugData', slugData)

			if (filteredPosts && filteredPosts.length > 0) {
				setPost(filteredPosts[0])
				// Fixed the categories processing
				if (filteredPosts[0].categories?.length > 0) {
					const categorydata = filteredPosts[0].categories.map(
						(category: { slug: string }) => category.slug
					)
					setCategory(categorydata)
				}
			} else {
				setError('Post not found')
			}
		} catch (error) {
			console.error('Error fetching posts:', error)
			setError(
				error instanceof Error ? error.message : 'Failed to fetch posts'
			)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getPost()
	}, [id])

	if (loading) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
			</div>
		)
	}

	if (error) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-semibold mb-2 text-red-600'>
						Error
					</h1>
					<p className='text-muted-foreground mb-4'>{error}</p>
					<Button onClick={() => router.push('/')}>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back to Posts
					</Button>
				</div>
			</div>
		)
	}

	if (!post) {
		return (
			<div className='min-h-screen flex items-center justify-center'>
				<div className='text-center'>
					<h1 className='text-2xl font-semibold mb-2'>
						Post not found
					</h1>
					<p className='text-muted-foreground mb-4'>
						The post you're looking for doesn't exist.
					</p>
					<Button onClick={() => router.push('/')}>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Back to Posts
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='min-h-screen bg-background '>
			<div className='max-w-4xl mx-auto px-4 py-8'>
				{/* Header with back button */}
				<div className='mb-8 '>
					<Button
						variant='ghost'
						onClick={() => router.push(`/categories/${slug}`)}
						className='mb-4 -ml-2'
					>
						<ArrowLeft className='h-4 w-4 mr-2' />
						Về danh sách bài viết
					</Button>
				</div>

				{/* Post header */}
				<header className='mb-8 ml-25 mr-25'>
					{post.categories && post.categories.length > 0 && (
						<div className='flex items-center gap-2 mb-4 flex-wrap'>
							{post.categories.map((category, index) => (
								<Badge key={index} variant='secondary'>
									{typeof category === 'string'
										? category
										: category.title || category.name}
								</Badge>
							))}
						</div>
					)}

					<h1 className='text-4xl font-bold text-balance mb-4'>
						{post.title || 'Untitled'}
					</h1>

					<div className='flex items-center gap-6 text-sm text-muted-foreground'>
						{post.publishedAt && (
							<div className='flex items-center gap-1'>
								<Calendar className='h-4 w-4' />
								<span>
									{new Date(
										post.publishedAt
									).toLocaleDateString('en-vi', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</span>
							</div>
						)}

						{post.createdAt && !post.publishedAt && (
							<div className='flex items-center gap-1'>
								<Calendar className='h-4 w-4' />
								<span>
									{new Date(
										post.createdAt
									).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</span>
							</div>
						)}
					</div>
				</header>

				<Separator className='mb-8' />

				{/* Post content */}
				<div className='ml-30 mr-30'>
					<article className='mb-8'>
						<RichTextRenderer content={post.content} />
					</article>
				</div>
			</div>
			<ScrollToTop />
		</div>
	)
}

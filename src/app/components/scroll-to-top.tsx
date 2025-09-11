'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ScrollToTop() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			// Show button when page is scrolled down 300px
			if (window.pageYOffset > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', toggleVisibility)

		return () => {
			window.removeEventListener('scroll', toggleVisibility)
		}
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	if (!isVisible) {
		return null
	}

	return (
		<Button
			onClick={scrollToTop}
			className='fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-blue-500 p-0 shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2'
			aria-label='Cuộn lên đầu trang'
		>
			<ChevronUp className='h-6 w-6 text-white' />
		</Button>
	)
}

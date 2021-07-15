import React from 'react'
import { Toaster as ReactToaster } from 'react-hot-toast'

function Toaster(): JSX.Element {
	return (
		<>
			<ReactToaster
				position='bottom-center'
				toastOptions={{
					style: {
						color: 'white',
						fontFamily: 'Inter',
						background: '#35403F',
						maxWidth: 'fit-content',
						borderLeft: '3px solid #54D4CB',
					},
					success: {
						duration: 5000,
						iconTheme: {
							primary: '#54D4CB',
							secondary: 'white',
						},
					},
				}}
			/>
		</>
	)
}
export default Toaster

import md5 from 'md5';

export default function getUserId() {
	return new Promise((complete, reject) => {
		const useMessengerExtension = function() {
			MessengerExtensions.getContext(
				'817793415088295',
				({ psid }) => {
					try {
						
						alert("[PSID OK]",psid)
						complete(md5(psid))
					} catch (error) {
						console.warn('get user data error', error);
						alert('Network Error');
						reject();
					}
				},
				err => {
					console.warn('no psid :(');
					alert('no psid :(')
					complete('fbad78af5e115963b0ad97aa3da436c0');
					
				}
			);
		};
		if (document.readyState === 'complete') {
			useMessengerExtension();
		} else {
			document.addEventListener('readystatechange', () => {
				if (document.readyState === 'complete') {
					useMessengerExtension();
				}
			});
		}
	});
}

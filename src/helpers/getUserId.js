import md5 from 'md5';
import store from '../store/store.js'
import {setIsWebview} from '../store/actions'

export default function getUserId() {
	return new Promise((complete, reject) => {
		const useMessengerExtension = function() {
			MessengerExtensions.getContext(
				'817793415088295',
				({ psid }) => {
					try {
						
						console.warn("[PSID OK]",psid)
						complete(md5(psid))
						store.dispatch(setIsWebview())
						
					} catch (error) {
						console.warn('get user data error', error);
						alert('Network Error');
						reject();
					}
				},
				err => {
					console.warn('no psid :(');
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

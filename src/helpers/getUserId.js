import md5 from 'md5';
import store from '../store/store.js'
import {setIsWebview} from '../store/actions'

export default function getUserId() {
	return new Promise((complete, reject) => {
		const useMessengerExtension = function() {
			MessengerExtensions.getContext(
				'817793415088295',
				({ psid }) => {
						console.warn("[PSID OK]",psid)
						complete(md5(psid))
						store.dispatch(setIsWebview())
				},
				err => {
					console.warn('no psid :(');
					const isDev = document.cookie.indexOf("festbotDebug")>-1
					if (isDev) {
						alert("User data error, please reload the page, teszt user dev")
						complete('4842567782cdf2aa620f1060e1dcbcd7');
					} else {
						alert("User data error, please reload the page,teszt user")
						reject()
					}
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

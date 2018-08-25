import md5 from 'md5';
import store from '../store/store.js';
import { setIsWebview } from '../store/actions';
import cookie from 'cookie';

const sleep = timeout =>
	new Promise(resolve => {
		setTimeout(resolve, timeout);
	});

const getUserIdFromMessenger = () => {
	return new Promise((complete, reject) => {
		MessengerExtensions.getContext(
			'817793415088295',
			({ psid }) => {
				console.warn('[PSID OK]', psid);
				complete(md5(psid));
				store.dispatch(setIsWebview());
			},
			err => {
				console.warn('no psid :(');
				const isDev = document.cookie.indexOf('festbotDebug') > -1;
				if (isDev) {
					complete('4842567782cdf2aa620f1060e1dcbcd7');
				} else {
					reject(err);
				}
			}
		);
	});
};

const waitUntilDocumentIsReady = () => {
	return new Promise((complete, reject) => {
		if (document.readyState === 'complete') {
			complete();
		} else {
			document.addEventListener('readystatechange', () => {
				if (document.readyState === 'complete') {
					complete();
				}
			});
		}
	});
};

const getUserIdFromCookie = () => {
	return cookie.parse(document.cookie).userPsid;
};



export default async function getUserId() {
	await waitUntilDocumentIsReady();
	let userId;
	if (getUserIdFromCookie()) {
		return getUserIdFromCookie();
	} else {
		for (let i = 0; i < 10; i++) {
			try {
				await sleep(300);
				userId = await getUserIdFromMessenger();
				document.cookie = `userPsid=${userId}`
				break;
			} catch (err) {
				if (i === 9) {
					throw err;
				}
			}
		}
		return userId;
	}
}

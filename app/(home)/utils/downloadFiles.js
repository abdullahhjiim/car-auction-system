import axios from 'axios';

const downloadFile = (url, fileName, ext = '.xls', callback = null) => {
	axios
		.get(url, {
			responseType: 'blob',
		})
		.then((res) => {
			const element = document.createElement('a');
			element.download = fileName + ext;
			element.href = URL.createObjectURL(res.data);
			document.body.appendChild(element);
			element.click();
			if (callback) {
				callback(false);
			}
		});
};

export default downloadFile;

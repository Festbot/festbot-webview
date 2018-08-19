import React, { Component } from 'react';
import uploadcare from 'uploadcare-widget';

class Uploader extends Component {
	componentDidMount() {
		const widget = uploadcare.Widget(this.uploader);
		const {
			input: { value, onChange }
		} = this.props;

		if (typeof value !== 'undefined') {
			widget.value(value);
		}


		widget.onChange(async file => {
            
            if (file.files) {
                const uploadedFiles = file.files()
                const promises = uploadedFiles.map(promise=>promise.promise())
                const results = await Promise.all(promises)
                const arrayOfUUID = results.map(result => result.uuid)
                onChange(arrayOfUUID)
            }
			if (file.done) {
				file.done(function(info) {
   
                    onChange([info.uuid])
					// Handle uploaded file info.
				});
			}

		});

		widget.onDialogOpen(dialog => (this.dialog = dialog));
	}

	componentWillUnmount() {
		if (this.dialog) {
			this.dialog.reject();
		}
		if (this.files) {
			uploadcare.jQuery.when.apply(null, this.files).cancel();
		}

		const widgetElement = uploadcare
			.jQuery(this.uploader)
			.next('.uploadcare--widget');
		const widget = widgetElement.data('uploadcareWidget');

		if (widget && widget.inputElement === this.uploader) {
			widgetElement.remove();
		}
	}

	getInputAttributes() {
		const attributes = Object.assign({}, this.props);

		delete attributes.value;
		delete attributes.onChange;
		delete attributes.onUploadComplete;

		return attributes;
	}

	render() {
		const attributes = this.getInputAttributes();

		return (
			<input
				type="hidden"
                ref={input => (this.uploader = input)}
                data-images-only="true"
				data-multiple="true"
				data-image-shrink="1024x1024 80%"
				{...attributes}
			/>
		);
	}
}

export default Uploader;


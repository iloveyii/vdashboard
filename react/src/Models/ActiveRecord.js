import Model from './Model';

class ActiveRecord extends Model{
    mode = 'create';
    _uploadProgress = 0;
    _form = {};
    _subscribers = [];

    constructor(form, forceUpdate = null) {
        // name, forceUpdate = null, server
        super(null, forceUpdate, null);
        this.form = form;
        if (forceUpdate && typeof forceUpdate === 'function') {
            this.forceUpdate = forceUpdate;
        } else {
            this.forceUpdate = () => null;
        }
        this.debug = true;
    }

    get __class() {
        return 'ActiveRecord';
    }

    subscribe(method) {
        if (Array.isArray(method)) {
            this._subscribers = [...this._subscribers, ...method];
        } else {
            this._subscribers.push(method);
        }
        return this;
    }

    forceUpdateOnSubscribers(method) {
        this._subscribers.includes(method) && this.forceUpdate();
    }

    set form(form) {
        for (let key in form) {
            this._form[key] = form[key];
        }
        return this;
    }

    get form() {
        return this._form;
    }

    setUploadProgress(value) {
        this._uploadProgress = value;
        this.forceUpdateOnSubscribers('setUploadProgress');
        if (this._uploadProgress > 99) {
            this.form = new ActiveRecord().form;
            this.mode = 'create';
        }
    }

    submitForm(action) {
        const formData = new FormData();
        Object.keys(this.form).map(key => {
            formData.append(key, this.form[key]);
        });
        this.mode === 'create' ? action(formData, this.setUploadProgress) : action(formData, this.setUploadProgress);
        return this;
    }
}

export default ActiveRecord;

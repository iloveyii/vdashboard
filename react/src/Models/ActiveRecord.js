import Model from './Model';

class ActiveRecord extends Model{
    mode = 'create';
    _uploadProgress = 0;
    _form = {};
    _subscribers = [];

    constructor(name) {
        super(name);
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

    forceUpdateOnSubscribers = (method) => {
        this._subscribers.includes(method) && this.forceUpdate();
    }

    forceUpdate() {

    }

    set form(form) {
        this._form = {};
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
        // this.forceUpdateOnSubscribers('setUploadProgress');
        if (this._uploadProgress > 99) {
            this.form = {};
            this.mode = 'create';
        }
    }

    /**
     * Avoid problem of bound to unbound controls on form
     */
    resetForm() {
        Object.keys(this.form).forEach( key => {
            this._form[key] = '';
        })
    }

    submitForm(createAction, updateAction) {
        const formData = new FormData();
        Object.keys(this.form).map(key => {
            formData.append(key, this.form[key]);
        });

        this.hasId ? updateAction({formData, action:this.setUploadProgress}) : createAction({formData, action:this.setUploadProgress});
        this.resetForm();
        return this;
    }

    get hasId() {
        if(this.form['id'] && this.form['id'].length > 0) return true;
        if(this.form['_id'] && this.form['_id'].length > 0) return true;
        return false;
    }
}

export default ActiveRecord;

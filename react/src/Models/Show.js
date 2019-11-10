import ActiveRecord from './ActiveRecord';

class Show extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            title : '',
            description: '',
            mode: this.types.create
        };
    }
}

export default Show;

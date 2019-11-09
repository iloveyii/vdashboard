import ActiveRecord from './ActiveRecord';

class Show extends ActiveRecord {
    constructor(name) {
        super(name);
        this.form = {
            title : '',
            description: ''
        };
    }
}

export default Show;

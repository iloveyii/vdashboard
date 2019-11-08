import ActiveRecord from './ActiveRecord';

class Show extends ActiveRecord {
    constructor(name, server, form, forceUpdate) {
        super(form, forceUpdate);
        super.name = name;
        super.server = server;


    }


}

export default Show;

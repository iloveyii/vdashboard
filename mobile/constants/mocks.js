import * as settings from "./settings";
import axios from "axios";

const tabs = ['Remote', 'Channels', 'Favourite', 'TV'];
let entries = [
    {
        "_id": "5d174c406d3ea03aa713e96d",
        "title": "Recusandae Consequa",
        "description": "Rerum laboriosam et",
        "show": "Label",
        "season": "Consequatur sed eve",
        "episode": "Eaque adipisci fugia",
        "genre": "Jazz",
        "image": "/images/8c07fdf0-9a61-11e9-b9eb-29e913c2313c.png",
        "video": "/vids/8c07fdf0-9a61-11e9-b9eb-29e913c2313c.mp4",
        "popular": 28
    },
    {
        "_id": "5d1774d06d3ea03aa713e96f",
        "title": "Bailando",
        "description": "Magnam consectetur o",
        "show": "label",
        "season": "sfjlasjfljla lfsdfa",
        "episode": "Sed quisquam quidem ",
        "genre": "disco",
        "image": "/images/b9b6b530-9a79-11e9-b9eb-29e913c2313c.png",
        "video": "/vids/b9b6b530-9a79-11e9-b9eb-29e913c2313c.mp4",
        "popular": 20
    },
    {
        "_id": "5d17bf9eaed35f5b3bd817fc",
        "title": "Natus corrupti nost",
        "description": "Perspiciatis expedi",
        "show": "Label",
        "season": "Dolor quidem magni e",
        "episode": "Quas aspernatur poss",
        "genre": "Jazz",
        "image": "/images/4f79c5e0-9aa6-11e9-a6b6-997e82d18220.png",
        "video": "/vids/4f79c5e0-9aa6-11e9-a6b6-997e82d18220.mp4",
        "popular": 17
    },
];

async function getEntries() {
    try {
        console.log('Inside getEntries');
        const response = await axios.get(settings.apiServer + '/api/v1/songs');
        entries = response.data;
    } catch (e) {
        console.log(e);
    }
}

// getEntries();

export {
    tabs,
    entries
};

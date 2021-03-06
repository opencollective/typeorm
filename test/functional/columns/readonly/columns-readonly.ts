import "reflect-metadata";
import {expect} from "chai";
import {closeTestingConnections, createTestingConnections, reloadTestingDatabases} from "../../../utils/test-utils";
import {Connection} from "../../../../src/connection/Connection";
import {Post} from "./entity/Post";

describe("columns > readonly functionality", () => {

    let connections: Connection[];
    before(async () => connections = await createTestingConnections({
        entities: [Post],
        dropSchema: true
    }));
    beforeEach(() => reloadTestingDatabases(connections));
    after(() => closeTestingConnections(connections));

    it("should not update columns marked with readonly property", () => Promise.all(connections.map(async connection => {

        const postRepository = connection.getRepository(Post);

        // create and save a post first
        const post = new Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorName = "Umed";
        await postRepository.save(post);

        // then update all its properties and save again
        post.title = "About columns1";
        post.text = "Some text about columns1";
        post.authorName = "Umed1";
        await postRepository.save(post);

        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository.findOneById(1);
        expect(loadedPost!.title).to.be.equal("About columns1");
        expect(loadedPost!.text).to.be.equal("Some text about columns1");
        expect(loadedPost!.authorName).to.be.equal("Umed1");

    })));


});

module.exports = {
    posts: [
        {
            id: "000",
            title: "Post exemplo",
            description: "Esta é uma descrição de exemplo."
        },
    ],

    getAll() {
        return this.posts
    },

    newPost(title, description) {
        this.posts.push({ id: generateId(), title, description })
    },

    deletePost(id) {
        let index = 0;
        let numPosts = this.posts.length
        while (this.posts[index].id != id && index < numPosts)
            index++;

        if (index < numPosts)
            this.posts.splice(index, 1)
    }
}

function generateId() {
    return Math.random().toString(36).substr(2, 9)
}
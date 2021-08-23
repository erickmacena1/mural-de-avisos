
document.addEventListener("DOMContentLoaded", () => {
    updatePosts()
})

function updatePosts() {

    fetch("http://192.168.0.105:3000/api/all").then(res => res.json())
        .then(json => {
            let postElements = '';

            let posts = JSON.parse(json)
            posts.forEach(post => {
                let postElement = `
                    <div id="${post.id}" class="card" style="max-width: 450px;">
                        <div class="card-header">
                            <h5 class="card-title d-flex align-items-center justify-content-between">${post.title} <button type="button" class="btn-close ms-2" aria-label="close" onclick="deletePost(this)"></button></h5>
                        </div>`;
                if(post.description != '') {
                    postElement += `
                        <div class="card-body">
                            <div class="card-text">${post.description}</div>
                        </div>
                    </div>`;
                }
                else {
                    postElement += "</div>"
                }
                    postElements += postElement
            })

            document.getElementById("posts").innerHTML = postElements
        })
}

function newPost() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("desc").value;

    if(title == '') {
        alert("O título não pode ser vazio!")
        return
    }

    let post = { title, description }

    const options = {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(post)
    }

    fetch("/api/new", options)
        .then(res => res.text())
        .then(data => {
            console.log(data)
        })

    updatePosts()

    title = document.getElementById("title").value = '';
    description = document.getElementById("desc").value = '';
}

function deletePost(elem) {
    let id = elem.parentNode.parentNode.parentNode.id
    
    let options = {
        method: "DELETE",
        headers: new Headers({"content-type": "application/json"}),
        body: JSON.stringify({id})
    }

    fetch("/api/delete", options)
        .then(res => res.text())
        .then(data => {
            console.log(data)
        })

    updatePosts()
}
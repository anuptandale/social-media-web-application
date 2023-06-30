{
    //method to submit the form data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newpost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newpost);
                    deletePost($(' .delete-post-button',newpost));

                    new PostComments(data.data.post._id);

                    new ToggleLike($('.toggle-like-button', newPost));

                },error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }
    
    //method to create a post in DOM
    //creating a post in DOM we need a function which will help us text of html to jquery object
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
    
        <p>
        <small>
            <a class="delete-post-button" href="/posts/destroy/${post._id}">X</a>
        </small>
        ${post.content}
         <br>
            <small>
            ${post.user.name}
            </small>
        <small>
            <a class="toggle-like-button" data-likes="0" href="/likes/toggle/?id=${post._id}&type=Post">
                0 Likes
            </a>
        </small>    
    </p>
        
    
    <div class="post-comments">
        <form action="/comments/create" method="POST">
            <input type="text" name="content" placeholder="Type here to add comment...">
            <input type="hidden" name="post" value="${post._id}">
            <input type="submit" value="Add comment">
        </form>

            <div class="post-comments-list">
                <ul id="post-comments-<${post._id}">
                    
                </ul>
            </div>
    </div>
</li>`)
    }

    //method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    createPost();

 
}
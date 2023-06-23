// {
//     let createComment = function(){
//         let newCommentForm = $('#new-comment-form');

//         newCommentForm.submit(function(e){
//             e.preventDefault();
//             $.ajax({
//                 type:'post',
//                 url:'/comments/create',
//                 data: newCommentForm.serialize(),
//                 success: function(data){
//                     let newComment = newCommentDom(data.data.comment);
//                     $(`#post-comments-${post._id}`).prepend(newComment);
//                 },error: function(error){
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }

//     let newCommentDom = function(comment){
//         return $(`<li id="comment-${comment._id}">
//         <p>
//                 <small>
//                     <a class="delete-comment-button" href="/comments/destroy/${comment.id}">X</a>
//                 </small>
//                 ${ comment.content} 
//             <br>
//             <small>
//             ${comment.user.name} 
//             </small>
//         </p>
//         </li>`)
//     }

//     createComment();
// }
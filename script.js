let users;
let usersPosts;
let pinnedPost = "";
let currentUser;

document.getElementById("signin_button").addEventListener("click", function(e){
    e.preventDefault();
    let enteredEmail = document.getElementById("inemail").value;
    let enteredPassword = document.getElementById("inpassword").value;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var receivedData = JSON.parse(xhttp.responseText);
            users = receivedData.users;

            for(let i = 0; i < users.length ; i++){
                if(users[i].email == enteredEmail && users[i].password == enteredPassword){
                    currentUser = users[i];
                    usersPosts = currentUser.post;
                    document.getElementById("inemail").value ="";
                    document.getElementById("inpassword").value = "";
                    document.getElementById("invalid_user").style.opacity = "0";
                    document.getElementById("username_container").innerHTML = users[i].fullname;
                    document.getElementById("aka_username_container").innerHTML = users[i].username;
                    document.getElementById("profile_pic").src = users[i].profpic;
                    document.getElementById("followers").innerHTML = users[i].followers;
                    document.getElementById("following").innerHTML = users[i].following;
                    document.getElementById("right_section").style.background = "url('" + users[i].background + "')";
                    document.getElementById("right_section").style.backgroundSize = "cover";
                    document.title = users[i].username + "  " + "(" + users[i].fullname + ")" + " | FormAwesome";
                    //document.body.style.overflowY = "scroll";

                    for(let i = 0; i < usersPosts.length ; i++){
                        pinnedPost += `<div class="post">
                        <div class="post_title">
                            <li>${usersPosts[i].title}</li>
                        </div>
                        <div class="short_post_disc">
                            ${usersPosts[i].discription}
                            
                            <details>
                                <summary>About</summary>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis cupiditate inventore magni facilis excepturi placeat maiores ut sequi, est nulla!
                                </p>
                            </details>
                        </div>
                    </div>`;
                    }

                    loadFeed();
                    break;
                }
                else{
                    document.getElementById("invalid_user").style.opacity = "1";
                    document.getElementById("inemail").value ="";
                    document.getElementById("inpassword").value = "";
                    noFeed();
                }
            }
        }
    };
    xhttp.open('GET', 'data.json', true);
    xhttp.send();
});


document.getElementById("signup_button").addEventListener("click", function(){

});


function loadFeed(){
    //console.log("success");
    document.getElementById("front_header").style.marginTop = "-100vh";
    //document.getElementById("front_header").style.transform = "translateY(-100vh)";
    document.getElementById("feed_section").style.display = "grid";
    document.getElementById("pinned_posts").innerHTML = pinnedPost;
    pinnedPost = "";
 
}

function noFeed(){
    console.log("ceash");
}


document.getElementById("logout_holder").addEventListener("click", function(){

    document.getElementById("front_header").style.marginTop = "0vh";
    document.getElementById("feed_section").style.display = "none";
    document.getElementById("inemail").value ="";
    document.getElementById("inpassword").value = "";
    document.getElementById("invalid_user").style.opacity = "0";
    document.getElementById("username_container").innerHTML = "";
    document.getElementById("aka_username_container").innerHTML = "";
    document.getElementById("profile_pic").src = "";
    document.getElementById("followers").innerHTML = "";
    document.getElementById("following").innerHTML = "";
    document.title = "Sign In | FormAwesome";
});


// document.getElementById("show_pass").addEventListener("click", function(){
//     //document.getElementById("view_pass_ico").style.opacity = "1";
//     //document.getElementById("inpassword").type = "text";
// });
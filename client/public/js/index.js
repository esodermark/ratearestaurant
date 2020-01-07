document.addEventListener("DOMContentLoaded", function (e){
    const overlay = document.getElementById("overlay");
    const addBtn = document.getElementById("addBtn");
    const input = document.getElementById("input");
    const cancelBtn = document.getElementById("cancel");
    const removeEditContainer = document.querySelectorAll(".edit-restaurant-container");
    console.log(removeEditContainer);

    addBtn.addEventListener('click', addRestaurant);
    overlay.addEventListener('click', cancel);
    cancelBtn.addEventListener('click', cancel);
    // editBtn.addEventListener('click', editRestaurant);

    function getNumRestaurants() {
        const comment = {
        }
        const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
        };
        fetch("http://localhost:3000/getNumRestaurants", option)
                .then(r =>  r.json().then(data => ({status: r.status, body: data})))
                .then(function(data){
                   let restaurants = data.body.body;
                   restaurants.forEach((restaurant) => {
                       document.getElementById('edit' + restaurant.id).addEventListener('click', function(e){
                        document.getElementById('editContainer' + restaurant.id).style.display = "block";
                        overlay.style.display = "block";
                       })
                   })
                //    for(let i = 1; i <= data.body.body.length; i++){
                //        document.getElementById(data.body).addEventListener('click', function(e){
                //         document.getElementById('editContainer' + i).style.display = "block";
                //         overlay.style.display = "block";
                //        });
                       
                //    }
                //    let numRestaurants = data.body.body;
                //    numRestaurants.forEach((restaurant) => {
                //        document.getElementById('edit' + )
                //    });
                });
    }

    

    function addRestaurant() {
        overlay.style.display = "block";
        input.style.display = "block";
    }

    function editRestaurant() {
        console.log(this.target);
        console.log('hejehj');
        overlay.style.display = "block";
    }

    function cancel() {
        overlay.style.display = "none";
        input.style.display = "none";
        removeEditContainer.forEach((edit) => {
            edit.style.display = "none";
        })
    }

    getNumRestaurants();
});
Controles = {
    up: false,
    down: false,
    left: false,
    right: false
}

document.addEventListener("keydown", function(event){

    if (event.key === "w") {
        Controles.up = true;
    }else if (event.key === "a") {
        Controles.left = true;
    }else if (event.key === "s") {
        Controles.down = true;
    }else if (event.key === "d") {
        Controles.right = true;
    }

});

document.addEventListener("keyup", function(event){

    if (event.key === "w") {
        Controles.up = false;
    }else if (event.key === "a") {
        Controles.left = false;
    }else if (event.key === "s") {
        Controles.down = false;
    }else if (event.key === "d") {
        Controles.right = false;
    }

});
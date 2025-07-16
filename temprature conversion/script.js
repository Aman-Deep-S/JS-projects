
document.getElementById("submitbtn").onclick = function () {
    let temp;
    if (document.getElementById("cbtn").checked) {
        temp = document.getElementById("textbox").value;
        temp = Number(temp);
        temp = tocelcius(temp);
        document.getElementById("templabel").innerHTML = temp + " C";
    }
    else if (document.getElementById("fbtn").checked) {
        temp = document.getElementById("textbox").value;
        temp = Number(temp);
        temp = tofahranhit(temp);
        document.getElementById("templabel").innerHTML = temp + " F";
    }
    else {
        document.getElementById("templabel").innerHTML = " select a unit";
    }
}
function tocelcius(temp) {
    return (temp - 32) * (5 / 9);
}
function tofahranhit(temp) {
    return temp * (9 / 5) + 32
}
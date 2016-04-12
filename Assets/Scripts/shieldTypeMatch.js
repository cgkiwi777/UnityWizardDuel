#pragma strict
var type : int;

var shield : GameObject;

function Update () {
setTag();
}

function setTag(){
if(type == 1){
gameObject.tag =  "blue";
}
if(type == 2){
gameObject.tag =  "gold";
}

}


function DeactivateShield(){
		 shield.SetActive(false);
}

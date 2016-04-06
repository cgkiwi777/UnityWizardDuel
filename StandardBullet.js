#pragma strict
var damage = 10;
var ownerID : String;
var damaged = false;


function OnTriggerEnter(collision : Collider) {

if (damaged == false){
if(collision.gameObject.tag == "Player"){
Destroy(gameObject);
collision.transform.SendMessage("Damage",damage);
damaged = true;
}
if (collision.gameObject.tag == "Ground"||collision.gameObject.tag == "Wall"){
Destroy(gameObject);
}
}
}



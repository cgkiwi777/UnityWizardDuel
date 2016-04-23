#pragma strict
var damage = 2;
var ownerID : String;
var damaged = false;
var playerShieldCol : EdgeCollider2D;
var boltCol : CircleCollider2D[];
var boltLife = 1;


function Start(){
//playerShieldCol = gameObject.GetComponentInParent(EdgeCollider2D);
//boltCol = gameObject.GetComponents.<CircleCollider2D>();

Physics2D.IgnoreCollision(playerShieldCol, boltCol[0]);
Physics2D.IgnoreCollision(playerShieldCol, boltCol[1]);
}

function Awake(){
	Destroy(gameObject, boltLife);
}

function OnTriggerEnter(collision : Collider) {

if (damaged == false){
if(collision.gameObject.tag == "Player"){
collision.transform.SendMessage("Damage",damage);
damaged = true;
Destroy(this.gameObject);
}
if (collision.gameObject.tag != "Player"){
Destroy(this.gameObject);
}
}
}

function OnCollisionEnter2D(coll: Collision2D){
if (damaged == false){
if(coll.gameObject.tag == "Player"){
coll.transform.SendMessage("Damage",damage);
damaged = true;
Destroy(this.gameObject);
	}

if(coll.gameObject.tag != gameObject.tag){
coll.transform.SendMessage("DeactivateShield");
damaged = true;
Destroy(this.gameObject);
	}
}

this.gameObject.GetComponent.<SpriteRenderer>().enabled = false;


}

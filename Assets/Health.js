#pragma strict
import UnityEngine.UI;
var Health : float = 100.0;
var Shields : float = 100.0;
var ShieldTotal = 100;
//var healthGUI : GUITexture;
//var shieldGUI : GUITexture;
var shieldsHit = false;
var shieldsRechargeRate : float = ShieldTotal/3.0;
var shieldsRechargeTime = 3.0;
var controller;
var charTag : GameObject;
var healthHUD : Text = GetComponent(UI.Text);
var shieldHUD : Text = GetComponent(UI.Text);
var playerTeamHud : Text = GetComponent(UI.Text);
var dead = false;
var anim : Animator;  
var hit = false;                
var respawnTime = 3.0;
var shieldTimer = 0.0;
var player : Transform;
var spawnPoint : Transform;
var startRecharge = false;
var canRecharge = false;
var shieldDelay = false;

function Update () {
	controller = charTag.tag;
	OnGUI();
	ifDead();
	shieldRecharge();
	stopShieldRegen();
}

function OnGUI(){
	healthHUD.text="Health: "+Health.ToString("F2");
	shieldHUD.text="Shield: "+Shields.ToString("F2");
	playerTeamHud.text="Team "+controller.ToString();
}

function Damage(damage:float){
	if(damage > Shields){
		Shields -= damage;
		Health += Shields;
		Shields = 0;
	}
	else if (Shields > 0 ){
		Shields -= damage;
	}
	 startRecharge = true;
	 shieldDelay = false;
}

function shieldRecharge(){
if (dead == false){
	if(Shields<100 && canRecharge == true){
		Shields += (shieldsRechargeRate)*Time.deltaTime;
		}
	if (Shields >= 100){
		Shields = 100;
		}
	}
}
function stopShieldRegen(){   //
	if (startRecharge == true){
		startRecharge = false; 
		canRecharge = false;
		shieldTimer = 0.0;
		shieldDelay = true;
	}
	if(shieldDelay == true && shieldTimer <=shieldsRechargeTime){
		shieldTimer += Time.deltaTime;
		if(shieldTimer >= shieldsRechargeTime){
			canRecharge = true;
		}
	}
}


function ifDead(){
	if (Health <= 0){
		Health = 0;
	}
	if(Health <= 0 && dead == false){
		Health = 0;
		dead = true;
		Shields = 0;
	 	anim.SetBool ("Death", dead);
	 	yield WaitForSeconds (respawnTime);
	 	player.transform.position = spawnPoint.position;
	 	dead = false;
	 	anim.SetBool ("Death", dead);
	 	Health = 100;
	 	Shields = 100;
	 }
}

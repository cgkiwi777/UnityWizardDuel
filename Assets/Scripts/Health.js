#pragma strict
import UnityEngine.UI;
var Health : float = 10.0;
var energy : float = 20.0;
var energyTotal = 20;
//var healthGUI : GUITexture;
//var energyGUI : GUITexture;
var energyHit = false;
var energyRechargeRate : float = 4.0;
var energyRechargeTime = 3.0;
var controller;
var charTag : GameObject;
var healthHUD : Text = GetComponent(UI.Text);
var energyHUD : Text = GetComponent(UI.Text);
var playerTeamHud : Text = GetComponent(UI.Text);
var dead = false;
var anim : Animator;  
var hit = false;                
var respawnTime = 3.0;
var energyTimer = 0.0;
var player : Transform;
var spawnPoint : Transform;
var startRecharge = false;
var canRecharge = false;
var energyDelay = false;
var spellStop = GetComponent(BulletSpawn);

function Update () {
	//controller = charTag.tag;
	//OnGUI();
	ifDead();
	energyRecharge();
}

/*function OnGUI(){
	healthHUD.text="Health: "+Health.ToString("F2");
	energyHUD.text="energy: "+energy.ToString("F2");
	playerTeamHud.text="Team "+controller.ToString();
}*/

function Damage(damage:float){
		Health -= damage;
}


function energyDrain(drain:float){
		if ((energy-drain) < 0){
		spellStop.Shoot = false;
		 } 
		energy -= drain;
}

function energyRecharge(){
if (dead == false){
	if(energy<energyTotal){
		energy += (energyRechargeRate)*Time.deltaTime;
		}
	if (energy >= energyTotal){
		energy = energyTotal;
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
		energy = 0;
	 	anim.SetBool ("Death", dead);
	 	yield WaitForSeconds (respawnTime);
	 	player.transform.position = spawnPoint.position;
	 	dead = false;
	 	anim.SetBool ("Death", dead);
	 	Health = 100;
	 	energy = 100;
	 }
}

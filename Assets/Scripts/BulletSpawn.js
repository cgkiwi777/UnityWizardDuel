#pragma strict
import UnityEngine.UI;
//Used objects
var BulletSpawn : Transform;
var goldBolt : Rigidbody2D;
var blueBolt : Rigidbody2D;
var Bullet : Rigidbody2D;
var shieldType : SpriteRenderer = GetComponentInChildren.<SpriteRenderer>();
//shieldType = GetComponentInChildren.<SpriteRenderer>(); //GetComponentsInChildren.<SpriteRenderer>()
var shield : GameObject;
var goldShield : Sprite;
var blueShield : Sprite;
var boltCost = 1;
var shieldCost = 4;
var dashCost = 6;
var energyChangeCost = 1;
var empowerCost = 2;
var energyCharge = 0;

var Position:Vector3;
//Gun Info
var gunName = "Standard Rifle";
//Ammo modifiers
var clipMod = 1;//modifier clip total size
var ammoSize = 1; //modifies clipsize based on ammo type
var ammoCalc = 1/ammoSize; //makes ammo percent modifier base on ammoSize
var baseAmmo = 60;
var totalAmmo = (baseAmmo + clipMod)*ammoCalc;
var ammoInClip = totalAmmo;
//reload modifiers
var Shoot = true;
var reloading = false;
var wasReloading = false;
var fastReload = 1.4f;
var slowReload = 1.7f;
var nextShot = 0.0;
//Accuracy Modifiers
var aim = false;
var aimMod = 1.1; // ADS. 2.1 is assault rifle. 10 is no change. 7 for shotty
var spread : float = 1.4; //2 for shotty(1.7?)
var spreadAdd = 0.05; // spread added per shot
var spreadTotal = 0.0; // cumulative spread at time without min spread.
var currentSpread = 0.0;//spread + spread Total;
var spreadDecay = 11.0;//decay = 11/s. from full spread, should take 0.4 seconds to go to min spread.
var decaySpread = false;
var aimDetach = false;
//FIRE RATE modifiers
var fireRate : float = 750.0;
var adjustedFireRate = 0; //60/fireRate
private var nextFire : float = 0.0;
//BURST modifiersxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
var burstCount = 1.0; //never below 1
var burstSpeed = 0.0;
//BULLET modifiers s * t = d. Distance is 60. time  to hit 30 is 30/speed
var bulletDamage = 21;// 15 for AR, 15 for shotty
var BulletSpeed = 54; // 42 is standard. 21 for shotty
var bulletLife = 1.4;
var bulletCount = 1;// 8 for shotty
//SPRINT Condition
var wasSprinting = false;
var walking;
var sprinting;
//UI information
var ammoHUD : UI.Text = gameObject.GetComponent(UI.Text); 
var gunNameHUD : UI.Text = gameObject.GetComponent(UI.Text); 
var reloadingHUD : UI.Text = gameObject.GetComponent(UI.Text); 
//var nextShotHUD : UI.Text = gameObject.GetComponent(UI.Text); 
//Stats
var shots = 0;
var spellType = 0;
var nextShield : float = 0.0;
var startingSpellType = 1;
var nextEnergyChange : float = 0.0;
var energyInvoke : Health = GetComponent(Health);
var shieldEnergyType = GetComponent(shieldTypeMatch);

/*function Start(){
	ammoHUD = gameObject.GetComponent(UI.Text);
	gunNameHUD = gameObject.GetComponent(UI.Text);
	reloadingHUD = gameObject.GetComponent(UI.Text);
}*/
function Awake(){
	totalAmmo = (baseAmmo + clipMod)*ammoCalc;
	ammoInClip = totalAmmo;
	adjustedFireRate = 60/fireRate;
	shield.SetActive(false);
	spellType = startingSpellType;

	//ammoHUD = GetComponent(UI.Text);
	//gunNameHUD = GetComponent(UI.Text);
	//reloadingHUD = GetComponent(UI.Text);
}

function Update () {
    //OnGUI();
    canShoot();
    switchSpells();
    //SpreadDecay();
    if(Time.time >= nextShield){
    shield.SetActive(false);
    Debug.DrawLine(transform.position, transform.position + Vector3.forward, Color.red );
    }
}

//function Fixed
/*function fixedUpdate(){
shoot();
}*/
function canShoot(){
	if(Input.GetMouseButton(0)&&Input.GetKeyDown("space")&&Time.time >= nextFire&&Shoot == true){
		nextFire = (Time.time + (3*adjustedFireRate));
		shootRay();
	}

	if(Input.GetMouseButton(1)&&Input.GetKeyDown("space")&&Time.time >= nextFire&&Shoot == true){
		nextFire = (Time.time + (3*adjustedFireRate));
		nextShield = Time.time + 4.0f;
		shield.SetActive(true);
	}

	else if(Input.GetMouseButton(1)&&Time.time >= nextFire){
	energyInvoke.energyDrain(shieldCost);
	if(Shoot == true){
		nextFire = (Time.time + 1); 
		nextShield = Time.time + 4.0f;
		shield.SetActive(true);
	}

	else{
		Shoot = true;
	}
	}


	else if(Input.GetMouseButtonDown(0)){
	energyInvoke.energyDrain(boltCost);
	if(Shoot == true){
		nextFire = Time.time + adjustedFireRate;
		shootBolt();
	}
	else{
		Shoot = true;
	}
	}
}


function shootBolt(){
var clone : Rigidbody2D;
clone = Instantiate(Bullet,BulletSpawn.transform.position,BulletSpawn.transform.rotation) as Rigidbody2D;
//var boltStats:StandardBullet = clone.GetComponent("StandardBullet");//wtf do i do with omplicit
//boltStats.damage = bulletDamage;
clone.GetComponent(StandardBullet).playerShieldCol = shield.GetComponent(EdgeCollider2D);
clone.GetComponent(StandardBullet).boltCol = clone.GetComponents.<CircleCollider2D>();

clone.velocity = clone.transform.TransformDirection(Vector3(0,BulletSpeed));
//Destroy(clone.gameObject, bulletLife);
}

function shootRay(){
//var hit: Raycasthit = Physics.Raycast(transform.position, Vector3.forward); 
}

function switchSpells(){ //toggle 1 and 0. 1 for blue, 0 for gold
	if (Input.GetKeyDown(KeyCode.LeftControl)&&Time.time>=nextEnergyChange){
	energyInvoke.energyDrain(energyChangeCost);
		if (spellType == 0){
		spellType = 1;
		}
	else if (spellType == 1){
		spellType = 0;
		}	
		nextFire = Time.time + energyCharge; 
		nextEnergyChange = Time.time + energyCharge;
	}
	if (spellType == 1){
	if (Time.time>nextShield){
		shieldType.sprite = goldShield;
		shieldEnergyType.type = 2;
		}
		Bullet = goldBolt;
	}
	if (spellType == 0){
	if (Time.time>nextShield){
		shieldType.sprite = blueShield;
		shieldEnergyType.type = 1;
		}
		Bullet = blueBolt;
	}
}

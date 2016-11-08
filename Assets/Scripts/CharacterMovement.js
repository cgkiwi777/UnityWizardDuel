#pragma strict
public var playerSpeed = 3.0f;
public var dashCost = 6;
public var health:Health = GetComponent(Health);
public var mousePosition:Vector3; 
public var dashDistance = 1.77;
public var dist : float;
public var angle: float; 
public var camera:Camera;
var direction: Vector3;
public var cameraPoint: GameObject;
public var mouseToScreen: Vector3;
public var playerRB: Rigidbody2D;
public var movement: Vector2;

function Start() {
	 playerRB = GetComponent.<Rigidbody2D>();
}

function Update () {
		var mousePos =  Input.mousePosition;
		mousePos.z = 4;
		mousePosition = Camera.main.ScreenToWorldPoint(mousePos);
		mousePosition.z = 0;

		var mouseDir : Vector3 = Camera.main.WorldToScreenPoint(transform.position);
		dist = Vector3.Distance(transform.position, mousePosition);
		var rawMouse:Vector3 = (mousePos - mouseDir);
		direction = (mousePos - mouseDir).normalized;

		mouseToScreen = Camera.main.ScreenToViewportPoint(rawMouse);

		cameraPoint.transform.localPosition =  mouseToScreen*1; 
		mouseToScreen.z = -4f;
        //angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg - 90;
	
  //Player to move vector directions.
      


        if (Input.GetKeyUp(KeyCode.LeftShift)) //dash
        {
            health.energyDrain(dashCost);
            if(dashDistance >= dist){
            	transform.position = mousePosition;
            }

            else{ 
            	
            	transform.Translate(direction*dashDistance);

            }
            
        }

}

	function FixedUpdate ()
	{
		movement = new Vector2(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"));
        movement.Normalize();
        //transform.Translate(movement * Time.deltaTime * playerSpeed);
        playerRB.velocity = (movement*playerSpeed*Time.deltaTime);

	}



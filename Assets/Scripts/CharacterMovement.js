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



function Update () {
		var mousePos =  Input.mousePosition;
		mousePos.z = 2.5;
		mousePosition = Camera.main.ScreenToWorldPoint(mousePos);
		mousePosition.z = 0;

		var mouseDir : Vector3 = Camera.main.WorldToScreenPoint(transform.position);
		dist = Vector3.Distance(transform.position, mousePosition);
		var rawMouse:Vector3 = (mousePos - mouseDir);
		direction = (mousePos - mouseDir).normalized;
		//Camera.main.transform.localPosition =  transform.TransformPoint(Input.mousePosition);
        //angle = Mathf.Atan2(direction.y, direction.x) * Mathf.Rad2Deg - 90;
	
  //Player to move vector directions.
      
        var movement = Vector3(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"),0);
        movement.Normalize();
        transform.Translate(movement * Time.deltaTime * playerSpeed);

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




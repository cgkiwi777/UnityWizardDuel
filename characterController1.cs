using UnityEngine;
using System.Collections;

public class characterController1 : MonoBehaviour
{

    public float playerSpeed = 5.0f;
   


    // Update is called once per frame
    void Update()
    {

        //Player to move vector directions.
      
        Vector3 movement = new Vector3(Input.GetAxisRaw("Horizontal"), Input.GetAxisRaw("Vertical"),0);
        movement.Normalize();
        transform.Translate(movement * Time.deltaTime * playerSpeed);
        

    }
}
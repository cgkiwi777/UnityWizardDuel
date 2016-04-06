using UnityEngine;
using System.Collections;

public class mouseLook : MonoBehaviour {


	
	// Update is called once per frame
	void Update () {
        //Player mouse look.
        
        Vector3 mousePos = Camera.main.WorldToScreenPoint(transform.position);
        Vector3 dir = (Input.mousePosition - mousePos).normalized;
        float angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg - 90;
        transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);

    }
}

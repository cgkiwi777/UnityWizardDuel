using UnityEngine;
using System.Collections;

public class spells : MonoBehaviour {

    public int[] energy = new int[2]; //0 is gold, 1 is blue
    public float cooldown = 0.5f; // cooldown for energy changing
    public float castTime;
    public float dashBar; //resource bar for time between dashes.
    public int weakAttackSpeed = 10;
    public int weakAttackDamage;
    public int weakAttackFireRate; //attacks per second
    public int strongAttackSpeed = 10;
    public int strongAttackDamage;
    public int strongAttackFireRate; //attacks per second
    public GameObject bolt;
    public Transform castPoint;

    public void spellCast()
    {
        if (Input.GetMouseButtonDown(0)){ //Weak Attack

            GameObject tempBolt = Instantiate(bolt) as GameObject;

           tempBolt.transform.position=transform.position;
            Rigidbody rb = tempBolt.GetComponent<Rigidbody>();
            rb.velocity = transform.forward * weakAttackSpeed;


           
        }
        if (Input.GetMouseButtonDown(0)&& Input.GetKeyDown("space"))//Strong Attack
        {


            Rigidbody tempBolt;
            tempBolt = Instantiate(bolt, transform.position, transform.rotation) as Rigidbody;

            
        }
        if (Input.GetMouseButtonDown(1)) //Weak Shield
        {


            Rigidbody tempBolt;
            tempBolt = Instantiate(bolt, transform.position, transform.rotation) as Rigidbody;

            
        }
        if (Input.GetMouseButtonDown(1) && Input.GetKeyDown("space"))//Strong Shield
        {


            Rigidbody tempBolt;
            tempBolt = Instantiate(bolt, transform.position, transform.rotation) as Rigidbody;

            
        }
    }


    // Use this for initialization
    void Start () {
	}
	
	// Update is called once per frame
	void Update () {
	spellCast();
	}

   
}
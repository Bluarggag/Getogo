

var inputIntents = {
    //spatials
    MOVEFORWARD: 0,
    MOVEBACKWARDS: 1,
    MOVELEFT: 2,
    MOVERIGHT: 3,
    TURNLEFT: 4,
    TURNRIGHT: 5
}

COMPONENT_INPUT = { "magnitude": 0 }; //of intent (index)

//move back/forth with 0.01, turns with 0.05
COMPONENT_INPUT[1] = [[0.01, 0.01,,,0.05, 0.05]];


var blorg = function updateListener() {
    
    keyEvent/mouseEvent

    for (inputComponent in inputComponents) {
        
        if (inputComponent.inputMap[event.keyCode]) { //MOVELEFT
            //create event with 
        }
    }

}




//key W

//current state blah blah

    enqueueEvent(new AddMovementEvent({
        entityData: {
            entityId: 3,
            velocity: [0.01, 0, 0]
        }
    }));
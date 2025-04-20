class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
        console.log(this.engine.storyData);
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        if(key != "Petting Dolphin"){
            this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        }     
        if(locationData.Choices.length >= 1) { // TODO: check if the location has any Choices, Note for Self:Passed in array of choices since empty array returns 0 and array with elements returns 1
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text,choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
           
        } else {
            this.engine.addChoice("The end.")
        }
        //console.log("Key:"+key)
    }

    handleChoice(choice) {
 
        if(choice) {

            if(choice.Text == "Open Emergency Hatch" && this.engine.boneKey == true){
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target2);

            }else if(choice.Target == "Petting Dolphin"){
                console.log(choice.Target);
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(locMec, choice.Target);
                
            }else if(choice.Target == "Found Key"){
                this.engine.boneKey = true;
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
            }else{
                this.engine.show("&gt; "+choice.Text);
                this.engine.gotoScene(Location, choice.Target);
               
            }
            
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class locMec extends Location{
    petDolphin(currLoc){
        if(this.engine.boneKey == false){
            this.engine.show(this.engine.storyData.Locations[currLoc].Body2);
        }else{
            this.engine.show(this.engine.storyData.Locations[currLoc].Body);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
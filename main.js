// Setting up the default namespace
var elns;
if (!elns) {
    elns = {};
}

//elns.distbwfloors = 10; // In meters

// Elevator class
(function() {
    function Elevator(id) {
        this.id         = id || -1;
        this.idle       = true;  // If elevator is sitting idle on a floor
        this.loading    = false; // If passengers are getting on or off
        this.lastfloor  = 99999; // Most recent floor reached, or current floor if idle/loading
        this.queue      = [];    // Current floor call requests to be processed (FIFO)
        this.travelTime = 4;     // Travel time between 2 adjacent floors, in seconds
        //this.speed      = 1;     // In meters per second
    }
    var el = Elevator.prototype;
    
    el.callthis = function(floor) {
        if (!isNaN(floor)){
            this.queue.push(floor);
        }
    };
    
    el.whereTo = function() {
        return this.queue[0];
    };
    
    elns.Elevator = Elevator;
}());

(function () {
    var ElevatorMainframe = {
        elevators: [new elns.Elevator(1), new elns.Elevator(2)], // Elevator objects array including all elevators in the system
        lastfloor: 99999,                                        // Most recent floor call
        
        callelev: function(floor) {                              // Method to add a call
            if (!isNaN(floor)){
                this.lastfloor = floor;
                for (var i = 0; i < this.elevators.length; i++) {
                    this.elevators[i].callthis(floor);
                }
            }
        }
    };
    elns.emf = ElevatorMainframe;
}());

window.onload = function() {
    elns.callbuttons = document.getElementsByClassName('callelev');
    for (var i = 0; i < elns.callbuttons.length; i++) {
        elns.callbuttons[i].addEventListener('click', function(e) {
            elns.emf.callelev(parseInt(e.target.value));
        });
    }
};
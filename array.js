const Memory = require('./memory');
function main(){
    // [ 0,3, 2, ... n,   M, 1, 2, ...x] y spot after the array, head line 18 of mem.js;
    //   ^512,    10   ^522
    class Array {
        constructor() {
            this.length = 0;
            this.ptr = myMem.allocate(this.length);
            this.capacity = 0;
            this.RESIZE_MULTIPLIER = 3;
        }
        //input->how much space do you need? input: i need this much
        //  output-> ok you have that much now <- this should be done is the output state
        _resize(){
            //want to increase our capacity, need to move our ptr to the new starting spot
            //1: move the pointer
           // console.log("before resize: ", this.length);
            this.ptr += myMem.allocate(this.length);
            if( this.ptr === null){
                throw new Error('No Free memory error');
            }
            this.capacity = ((this.length +1) * this.RESIZE_MULTIPLIER);
            //2: increase capacity  
            //console.log("after resize: ", this.length);                          
        } //call this send in some new space, expect our capacity to be enough afterwards

        readValue(index){
            return  myMem.get(this.ptr + index);
        } // get value 

        pushValue(value){
            //console.log("before push", this.ptr);
            let tempEndofArray = this.length;
            if (this.length >= this.capacity) {
                this._resize();
            }
            myMem.set(tempEndofArray, value);
            this.length = this.length +1;
           // console.log("end push", this.ptr);
        }//  create  *may need resize*

        insertValue(index, value){

         } // create new value at param index

        popValue(){
            
        }//  delete last value 

        removeValue(index){} // delete some value somewhere

        editValue(index, value){} // update value

    }//end class Array


    const myMem = new Memory();
    const myArray = new Array();
    // console.log("expect 3: ", myArray.RESIZE_MULTIPLIER);
    console.log("here", myArray);
    myArray.pushValue(1);
    console.log("here", myArray);
    myArray.pushValue(2);
    console.log("here", myArray);
    myArray.pushValue(3);
    console.log("here", myArray);
    myArray.pushValue(4);
    console.log("here", myArray);
    myArray.pushValue(4);

    console.log("Array is: ", myArray);
    return true;
}//end main function
console.log(main());


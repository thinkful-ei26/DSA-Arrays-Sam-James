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
        _resize(newSize){
            //want to increase our capacity, need to move our ptr to the new starting spot
            //1: move the pointer
            const oldPtr = this.ptr;
           // console.log("before resize: ", this.length);
            this.ptr += myMem.allocate(newSize);
            if( this.ptr === null){
                throw new Error('No Free memory error');
            }
            //2: increase capacity  
            // 3: copy the gosh darn array man!
            myMem.copy(this.ptr, oldPtr, this.length);
            //console.log("after resize: ", this.length);                          
            this.capacity = newSize;
        } //call this send in some new space, expect our capacity to be enough afterwards

        readValue(index){
            return  myMem.get(this.ptr + index);
        } // get value 

        pushValue(value){
            //console.log("before push", this.ptr);
            
            if (this.length >= this.capacity) {
                this._resize((this.length+1) * this.RESIZE_MULTIPLIER);
            }
            myMem.set((this.ptr + this.length), value);
            this.length = this.length +1;
           // console.log("end push", this.ptr);
        }//  create  *may need resize*

        insertValue(index, value){
            //check if index is valid:
            if(index < 0 || index > this.capacity){
                throw new Error('Error: the target index to insert at is not a legal space');
            }
            if((this.ptr + this.length) >= this.capacity){
                this._resize((this.length+1) * this.RESIZE_MULTIPLIER);
            }
            //inside copy params are (TO-Index, FROM-Index and size)
            myMem.copy(this.ptr + index + 1, this.ptr + index, this.length- index);
            myMem.set((this.ptr + index), value);
            this.length = this.length +1;
            console.log(`ok ${value} has been inserted at ${index}, have a nice day, Sam.`);
            const doubleCheck = myMem.get(index);
            console.log("expect this to match ^^", doubleCheck);
         } // create new value at param index

        popValue(){
            if(this.length === 0) {
                throw new Error('popValue error you have no array');                                    
            }
            
            const deletedValue = myMem.get(this.ptr + this.length - 1);
            this.length = this.length - 1;
            console.log('popValue completed deletedValue:', deletedValue);            
                        
        }//  delete last value 

        removeValue(index){} // delete some value somewhere

        editValue(index, value){
            if(index < 0 || index > this.length){
                throw new Error('index out of range for edit method');
            }
            myMem.set(index, value);
        } // update value

    }//end class Array


    const myMem = new Memory();
    const myArray = new Array();
    // console.log("expect 3: ", myArray.RESIZE_MULTIPLIER);
    // console.log("here", myArray);
     myArray.pushValue(0);
   // console.log("here", myArray);
    myArray.pushValue(1);
  //  console.log("here", myArray);
    myArray.pushValue(2);
  //  console.log("here", myArray);
    myArray.pushValue(3);
//console.log("here", myArray);
    myArray.pushValue(4);
   console.log("here", myArray);
    // myArray.popValue();
    // console.log("***POST POP Array is: ", myArray);

    console.log(`0 is: ${myArray.readValue(myArray.ptr)}`);
    console.log(`1 is: ${myArray.readValue(myArray.ptr + 1)}`);
    console.log(`2 is: ${myArray.readValue(myArray.ptr + 2)}`);
    console.log(`3 is: ${myArray.readValue(myArray.ptr + 3)}`);
    console.log(`4 is: ${myArray.readValue(myArray.ptr + 4)}`);

    myArray.insertValue(2, 42);
    console.log("**inserted index2, val42 Array is: ", myArray);
    
        console.log(`0 is: ${myMem.get(0)}`);
        console.log(`1 is: ${myMem.get(1)}`);
        console.log(`2 is: ${myMem.get(2)}`);
        console.log(`3 is: ${myMem.get(3)}`);
        console.log(`4 is: ${myMem.get(4)}`);
        console.log(`5 is: ${myMem.get(5)}`);

        // console.log(`1 is: ${myArray.readValue(myArray.ptr + 1)}`);
        // console.log(`2 is: ${myArray.readValue(myArray.ptr + 2)}`);
        // console.log(`3 is: ${myArray.readValue(myArray.ptr + 3)}`);
        // console.log(`4 is: ${myArray.readValue(myArray.ptr + 4)}`);
        // console.log(`5 is: ${myArray.readValue(myArray.ptr + 5)}`);
       // console.log(`index 5 is: ${myArray.readValue(this.ptr + 5)}`);
   
   // console.log("test get: ", myArray.readValue(4));
    //myArray.readValue(2);
    return true;
}//end main function
main();


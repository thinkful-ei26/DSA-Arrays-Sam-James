class Memory {
    constructor() {
      this.memory = new Float64Array(1024);//this.memory.length = 100 space(example)
      this.head = 0;//set to 50, because that much has been taken.
    }
  
    allocate(size) {
      //this if block checks for out of memory space problems
      //   0 > 100 ? no we arent out of mem
      if (this.head + size > this.memory.length) {
        return null;
      }
      //not out of memory space(because we start at 0/100 example)
      let start = this.head;//start becomes the first free open block, so 50
      
      //sets this.head to size 
      // example first setup run-- head += 0
      this.head += size;
      //moves head to the beginning of the new (next) free space
      return start;//so this.ptr on setup is set to 0
    }
  
    free(ptr) {}
    //on insert this.ptr
    // [0, 1, 2 ,3,  4, ... 50 ]
    copy(toIdx, fromIdx, size) {
      if (fromIdx === toIdx) {
        return;
      }
  
      if (fromIdx > toIdx) {
        // Iterate forwards
        for (let i = 0; i < size; i++) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      } else {
        // Iterate backwards
        for (let i = size - 1; i >= 0; i--) {
          this.set(toIdx + i, this.get(fromIdx + i));
        }
      }
    }
  
    get(ptr) {
      return this.memory[ptr];
    }
  //length 50 space=>  [0, 1, ... , 49]
  // resize +1 => [0, 1, ... , 49, 50]
    set(ptr, value) {
      this.memory[ptr] = value;//memory[50] the 51 item = new pushed value
    }
  }
  
  module.exports = Memory;
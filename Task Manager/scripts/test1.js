//object literal
let dog = {
    name: "Fido",
    age: 3, 
    color: "Red"
};

let cat={
    name: "Meow",
    age: 4
};

console.log(dog);
console.log(cat);

//object constructor 

function Pet(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;
}

let lion = new Pet("Alex", 8, "Gold");
console.log(lion);

let zebra= new Pet("Zerena", 4, "Black and White")
console.log(zebra);

//class
class Animal {
    //exec auto when a new object is created 
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    doSomething(){
        console.log("I'm doing it ");
    }
}

let wildcat = new Animal("Will", 3);
console.log(wildcat);
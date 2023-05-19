'use strict';
/*
// ! OBJECT ORIENTED PROGRAMMING (OOP) ->
//@ JavaScript is not a class-based object-oriented language. But it still has ways of using object oriented programming (OOP).The most popular model of OOP is class-based.
//@ It is aslo not a classed-based langauge it is a prototype-based langauge.

//! Constructor Functions and the the new Operator
//@ Convention - We capitilize the first letter of the name of constructor function. They are like blueprint or classical OOP classes from which we can make as many as objects or instances..Object obtained using this constructor function are not called instances but Js try to imitate the classical OOP since begining so it has one operator called 'instanceof' .
//~ Syntax - console.log(vaskar instanceof Person)

//! Behind the scene there are four steps -Done by new keyword
//@ 1. Creation of empty object{}

//@ 2. Function is called , 'this' keyword is set to empty object {} i.e this={}

//@ 3. Empty object {} is linked to prototype. and new operator create a __proto__ property on the prototype which is linked to object's prototype.

//@ 4. Function automatically return that empty object{} - so no need to add return keyword.

//! NOTE - >
//~ As arrow function doesnt has its own this keyword so constructor function cant be made using arrow function. only function declaration and function expression can be used to make constructor function.

const Person = function (firstName, birthYear) {
  //@ Setting property same property name in the object as parmeter name because this is a convention many developers have been following. But they can have other names.
  this.firstName = firstName;
  this.birthYear = birthYear;

  //! We must not declare any method in the constructor function because all the objects created using this constructor function will get the copy of that method so if we create 1000 object then that method will be copied 1000 times which is very bad for performance.
  //   this.calAge = function () {
  //     console.log(2022 - this.birthYear);
  //   };
};
const vaskar = new Person('Vaskar', 1997);
const mamata = new Person('Mamata', 2002);
const sum = 45 + 32;
console.log(vaskar, mamata);

console.log(vaskar instanceof Person);
console.log(sum instanceof Person);
// vaskar.calAge();

//! PROTOTYPE ->
//@ Person.prototype is the prototype of all the objects created using the Person constructor function. Person.prototype is not a prototype of the Person.

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

//@ calcAge method is in the prototype of the objects vaskar and mamata and they have the access of calcAge this method is not their own method. Due to prototypal inheritance they are inheriting the method from their prototye Person.prototype.

//! this keyword is linked to the object who is calling calcAge method.
vaskar.calcAge();
mamata.calcAge();

//! Finding prototypes of objects->
console.log(vaskar.__proto__);
console.log(mamata.__proto__);
//@ Checking their prototpes
console.log(vaskar.__proto__ === Person.prototype);
console.log(mamata.__proto__ === Person.prototype);
console.log(mamata.__proto__ === vaskar.__proto__);
console.log(Person.prototype.isPrototypeOf(vaskar));
console.log(Person.prototype.isPrototypeOf(mamata));
console.log(Person.prototype.isPrototypeOf(Person));

//! Setting properties on Person.prototype ->
Person.prototype.species = 'Homo sapiens';
console.log(vaskar);
console.log(vaskar.species);
console.log(mamata.species);

//! Check for own property ->
//@ Own properties of the objects created using constructor function are the ones which are directly declared in the object itself.
console.log(vaskar.hasOwnProperty('firstName'));
// @ species is not vaskar's own property it is the property declared in its prototype.
console.log(vaskar.hasOwnProperty('species'));

//! Prototypal Inheritance and Built In Objects ->
// ~ Every Objects are created using Object() constructor so each those object's prototype is Object.prototype
//~ We can create object using { } and new Object() (it is a constructor)
console.log(vaskar.__proto__); //@ Person.prototype
console.log(vaskar.__proto__.__proto__); //@ Object.prototype
console.log(vaskar.__proto__.__proto__.__proto__); //@ null

console.dir(Person.prototype.constructor); //@ Constructor function itself

//! Prototypes of array ->
//@  all arrays we create are behind the scene actually created using constructor function called Array() and those created arrays has prototype called Array.prototype (It contains all the methods we are been using on arrays like join, length, some, map, reduce etc...)

// ~ Arrays are created using modern [] and old new Array() syntaxes.

//~ Array.prototype is itself an object so its prototype is Object.prototype (Object() - constructor)

const testArray = [2, 4, 5, 2, 2, 4, 4, 4, 6, 7, 99, 99, 45, 45, 12, 143];
//@ OR
// const testArray1 = new Array(
//   2, 4, 5, 2, 2, 4, 4, 4, 6, 7, 99, 99, 45, 45, 12, 143,
// );
console.log(testArray.__proto__);
console.log(testArray.__proto__ === Array.prototype);
console.log(testArray.__proto__.__proto__); //@ Object constructor.

//~ Adding a method into the Array.prototype ->
//@ This is not recommended at all because if multiple users are working on the same project then there is a chance that multiple users are adding the same method using different names which leads to serious bugs . 2nd reason is that may be in newer version of js developers add some method using same name which we have given to our added method.
Array.prototype.unique = function () {
  console.log([...new Set(this)]);
};
testArray.unique();

//! Checking the prototypes of function - as function are aslo objects in JavaScript ->
const testFuntion = (a, b) => a + b;
console.dir(testFuntion);
//! Checking the prototypes of h1 element ->
const h1 = document.querySelector('h1');
console.dir(h1);
// ~ Prototypal chain of H1 element
// HTMLHeadingELement / HTMLElement / Element / Node / EventTarget / Object / null

//! Coding Challenge #1
// Your tasks:
// 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
// 'speed' property. The 'speed' property is the current speed of the car in
// km/h
// 2. Implement an 'accelerate' method that will increase the car's speed by 10,
// and log the new speed to the console
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
// the new speed to the console
// 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
// 'brake' multiple times on each of them
// Test data:
// § Data car 1: 'BMW' going at 120 km/h
// § Data car 2: 'Mercedes' going at 95 km/h
//@ Solution ->
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is travelling at ${this.speed} km/hr`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is travelling at ${this.speed} km/hr`);
};
const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);
console.log(bmw, mercedes);
bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.accelerate();
mercedes.accelerate();
mercedes.brake();
*/
///////////////////////////////////////////////////////////
/*
//! ES6 CLASSES

//! Class expression ->
// const PersonCl = class {};
//! Class Declaration ->
class PersonCl {
  //@ This constructor is similar to constructor function name should not be change.
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  }

  //@ All the methods declared outside constructor and within class will be prototypal properties.
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.firstName}`);
  }
}

const vaskar = new PersonCl('Vaskar', 1997);
console.log(vaskar);
vaskar.calcAge();
vaskar.greet();
console.log(vaskar.__proto__ === PersonCl.prototype);

//! We can still set methods using old method ->
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };

//! NOTES -->>
//@ 1. Classes are NOT Hoisted even if we use Class decleration.
//@ 2. Classes are first - class citizen.
//@ 3. Classes are executed in strict mode.
*/

/*
//! Setters and Getters ->
//@ Every Object in javascript have getters and setters property and we call these special properties assessor properties and other normal properties are called data properties.
//@ Getters and Setter are basically functions which set and get a value but from outside they still looks like properties

const account = {
  owner: 'Vaskar',
  movements: [233, 56, 600, 100, 68],
  get latest() {
    return +this.movements.slice(-1).join();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

//~ Getters and Setters are like Object properties so we can call them just like normal object properties,
//~ Only for setters we need to pass them an argument in the form as we are setting a new property.
// ~ It is not mandatory to have both setters and getters for a property . It is enough to have only setter or getter.

console.log(account.latest); // latest is a fn but here we are not traditionally calling it
account.latest = 5000; // here aslo we are like setting a new property but actually we are calling a fn with argument.
console.log(account.movements);

//! Setter and Getters In Classes -->
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2022 - this.birthYear;
  }
  //! fullName validation ->
  //@ For setting already existing property we need to add underscore which is a convention to avoid bug.
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full Name !`);
  }
  get fullName() {
    // Due to set fullName fn this.fullName becomes this._fullName , so user cant log vaskar.fullName now as the fullName property dont exist. To overcome this problem getter function with same fullName return this._fullName. Now both vaskar._fullName and vaskar.fullName will log exact same value. The former one is the actual property but the later one is returned property.
    return this._fullName;
  }
}

const vaskar = new PersonCl('Vaskar Chandra Das', 1997);
console.log(vaskar);
console.log(vaskar.age);
*/

/*
//! Static Methods ->
//@ These methods are not available to the objects or instances created using ES6 classes and constructor function Because these methods are directly added to the classes and constructor function aslo they are not added to the prototype so they are not get inherited to objects.

//! Static methods in constructor function ->
const Student = function (fullName, rollNumber) {
  this.fullName = fullName;
  this.rollNumber = rollNumber;
};
//! Setting static method on Constructor function ->
Student.hey = function () {
  console.log(`Hey How are You? 👋`);
  console.log(this);
};
const vaskar = new Student('Vaskar Chandra Das', 13);
console.log(vaskar);
console.log(Student.prototype === vaskar.__proto__);

Student.hey();
// vaskar.hey(); //@ NOT a function

//! Static methods in ES6 Classes ->

class StudentCl {
  constructor(fullName, rollNumber) {
    this.fullName = fullName;
    this.rollNumber = rollNumber;
  }
  //! Instance Methods - Availble to all instances or objects
  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2022 - this.birthYear;
  }
  //! Static methods
  static hey() {
    console.log(`Hey How are You? 👋`);
    console.log(this);
  }
}

StudentCl.hey();

//! Array.from() - this is aslo a static method which is not avialable to any array, other than Array constructor function.
*/

// /*
//! Object.create() ->
//@ Object.create() method is used to create a new object with the specified prototype object and properties.      Object.create() method returns a new object with the specified prototype object and properties.It is used for implementing inheritance.
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
//@ Instances/Objects created using Object.create() ->
const vaskar = Object.create(PersonProto);
vaskar.init('Vaskar Chandra Das', 1997);
vaskar.calcAge();
console.log(vaskar);
console.log(vaskar.__proto__ === PersonProto);

const mamata = Object.create(PersonProto);
mamata.init('Mamata Das', 2002);
mamata.calcAge();
console.log(mamata);
console.log(mamata.__proto__ === PersonProto);
// */
/*
//! Coding Challenge #2
// Your tasks:
// 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl')
// 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
// by 1.6)
// 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
// converts it to km/h before storing the value, by multiplying the input by 1.6)
// 4. Create a new car and experiment with the 'accelerate' and 'brake'
// methods, and with the getter and setter.
// Test data:
// § Data car 1: 'Ford' going at 120 km/h
//@ Solutions
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is travelling at ${this.speed} km/hr`);
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is travelling at ${this.speed} km/hr`);
  }
  get speedUS() {
    return console.log(this.speed / 1.6);
  }
  set speedUS(v) {
    return console.log((this.speed = v * 1.6));
  }
}

const ford = new CarCl('Ford', 120);
ford.speedUS;
ford.accelerate();
ford.accelerate();
console.log(ford);
ford.speedUS = 50;
console.log(ford);
*/
/*
//! Inheritance between classes using contructor function

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};
//@ Sub class ->
const Student = function (firstName, birthYear, course) {
  // this.firstName = firstName;
  // this.birthYear = birthYear;
  //!OR
  //@ Here call method set the this keyword to the object which will be made using Student constructor function.
  Person.call(this, firstName, birthYear);

  this.course = course;
};
//! Making Person.prototype to the prototype of Student.prototype so that object made using Student can inherit all the methods and properties from Person's Prototype USING Object.create() - >
//@ This is must be before setting any method to Student.Otherwise it will overide all the methods set to Student.
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} enrolled in ${this.course}😉`);
};
const vaskar = new Student('Vaskar Chandra Das', 1997, 'MCA');
vaskar.calcAge();
vaskar.introduce();
console.log(vaskar.__proto__);

//! Fixing Constructor function name of vaskar object ->
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

console.log(vaskar.__proto__);
console.log(vaskar.__proto__.__proto__);
console.log(vaskar instanceof Student);
console.log(vaskar instanceof Person);
console.log(vaskar instanceof Object);
*/
/*
//! Coding Challenge #3
// Your tasks:
// 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
// "class" of 'Car'. Besides a make and current speed, the 'EV' also has the
// current battery charge in % ('charge' property)
// 2. Implement a 'chargeBattery' method which takes an argument
// 'chargeTo' and sets the battery charge to 'chargeTo'
// 3. Implement an 'accelerate' method that will increase the car's speed by 20,
// and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
// km/h, with a charge of 22%'
// 4. Create an electric car object and experiment with calling 'accelerate',
// 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
// you 'accelerate'! Hint: Review the definiton of polymorphism 😉
// Test data:
// § Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
//@ Parent Class
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} is travelling at ${this.speed} km/hr`);
};
Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is travelling at ${this.speed} km/hr`);
};
//@ Child Class
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};
//! Linking prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge -= 1;
  console.log(
    `${this.make} going at ${this.speed} km/hr, with a charge of ${this.charge}`
  );
};
//! NOTE ->
//@ Both parent and child class has accelerate method but when we call that method using tesla object then the first accelerate method in the prototype chain will be used that accelerate method of EV...So this the example where the object made using child classes overide the methods of parent class. and this whole behaviour is called 'POLYMORPHISM' .

//@ Instance
const tesla = new EV('Tesla', 120, 90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.chargeBattery(100);
console.log(tesla);
*/
/*
//! Inheritance between classes using ES6 Classes ->
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2022 - this.birthYear);
  }
  greet() {
    console.log(`Hey ${this.fullName}`);
  }
  get age() {
    return 2022 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full Name !`);
  }
  get fullName() {
    return this._fullName;
  }
  static hey() {
    console.log(`Hey How are You? 👋`);
    console.log(this);
  }
}

//! NOTE ->
//@ 'extends' this will link child class to its parent class.
//! If we dont need any additional parameters or properties in the child class then we can simply leave the child class empty.
//@ But if we need additional parameters or properties then we need to use 'super' keyword which will work same as Person.call in the Constructor function. Like this ->
// class StudentCl extends PersonCl {}
// const binita = new StudentCl('Binita Tarafdar', 1997);
// console.log(binita);
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //@ THIS NEED TO WRITE FIRST OTHERWISE THIS KEYWORD WILL NOT WORK.
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`My name is ${this.fullName} enrolled in ${this.course}😉`);
  }
  //! Overiding calcAge method of parent class
  calcAge() {
    console.log(`I am ${2022 - this.birthYear} years old!`);
  }
}

const binita = new StudentCl('Binita Tarafdar', 1997, 'Msc');
binita.introduce();
binita.calcAge();
binita.greet();
console.log(binita);
*/

/*
//! Inheritance between classes using Object.create() ->
//@ Parent Object ->
const PersonProto = {
  calcAge() {
    console.log(2022 - this.birthYear);
  },
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};
const vaskar = Object.create(PersonProto);
vaskar.init('Vaskar Chandra Das', 1997);

//! Instances or Child Object ->
//@ Linking child object to parent object ->
const StudentProto = Object.create(PersonProto);
//@ Methods of child object ->
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.calcAge = function () {
  console.log(`I am ${2022 - this.birthYear} years old!`);
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} enrolled in ${this.course}!`);
};
//@ Creating a new child object using StudentProto->
const binita = Object.create(StudentProto);
binita.init('Binita Tarafdar', 1997, 'Msc');
binita.calcAge();
binita.introduce();
console.log(binita);
*/
/*
//! ES6 Classes - More examples ->
class Account {
  //@ Public Fields -> Can be accessed from outside
  locale = navigator.language;
  //@ Private Fields -> These fields are not accessible outside the class
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    console.log(`Thanks for opening an account, ${owner}.`);
  }
  //@ Public methods ->
  deposit(money) {
    this.#movements.push(money);
    return this;
  }
  withdraw(money) {
    this.deposit(-money);
    return this;
  }
  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan Approved!`);
      return this;
    }
  }
  getMovements() {
    return this.#movements;
  }
  //@ Private Methods ->
  #approveLoan(val) {
    return true;
  }
  //@ Other than these there are aslo Static version of them.
}
const acc1 = new Account('Vaskar', 'INR', 1111);
acc1.deposit(200);
acc1.withdraw(200);
acc1.requestLoan(12200);
console.log(acc1);

//! Chaning -> Method must return current object .
acc1.deposit(500).deposit(600).withdraw(9000).requestLoan(10000);
console.log(acc1.getMovements());
*/

//! Coding Challenge #4
// Your tasks:
// 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
// child class of the 'CarCl' class
// 2. Make the 'charge' property private
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
// methods of this class, and also update the 'brake' method in the 'CarCl'
// class. Then experiment with chaining!
// Test data:
// § Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

//@ Parent Class
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is travelling at ${this.speed} km/hr`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is travelling at ${this.speed} km/hr`);
    return this;
  }
}
//@ Child Class
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
  accelerate() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} going at ${this.speed} km/hr, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
rivian.accelerate().accelerate().accelerate().chargeBattery(86).brake();
// console.log(rivian.#charge);
console.log(rivian);

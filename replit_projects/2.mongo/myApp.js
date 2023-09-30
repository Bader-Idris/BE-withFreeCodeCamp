require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });



const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
  },
  age: {
    type: Number
  },
  favoriteFoods: {
    type: [String]
  }
});
const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => {
  let person = new Person({ name: "Bader Idris", age: 23, favoriteFoods: ["meat", "fish", "fresh fruit"] });

  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  /* 
  arrayOfPeople = [
    { name: "Hanady Adel", age: 30, favoriteFoods: ["soup", "chocolate", "fresh fruit"] },
    { name: "John Doe", age: 26, favoriteFoods: ["pizza", "pasta", "ice cream"] },
    { name: "Doe John", age: 25, favoriteFoods: ["sushi", "ramen", "salad"] }
  ];
 */
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.error(err);
      done(err);
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, personFound) => {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd)
    person.save((err, updatedPerson) => {
      if (err) return console.error(err);
      done(null, updatedPerson)
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, updatedDoc) => {
    if (err) return console.log(err);
    done(null, updatedDoc);
  })
  // { new: true });//required for allowing it to be saved with this method!
};

const removeById = (personId, done) => {
  const ageToSet = 20;
  Person.findOneAndRemove({ _id: personId }, (err, deleteDoc) => {
    if (err) return console.log(err);
    done(null, deleteDoc);
  })
  // similar to findByIdAndRemove
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, deleteDoc) => {
    if (err) return console.log(err);
    done(null, deleteDoc);
  })
  // removes many documents matching given criteria!
};


const queryChain = (done) => {
  const foodToSearch = "burrito";

  const findPerson =
    Person
      .find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec((err, data) => {
        // we can exec with a promise as: YourQuery.exec.then(function(err, docs) {})
        if (!err) {
          done(null, data);
          console.log(`Chained  Successfully. Results: ${data}`)
        } else {
          console.log(err);
        };
      });
};


// in queryChain:
// yourArray.sort({ age: 1 }); // Here: 1 for ascending	order and -1 for descending order.
// .limit(2) //2 docs
// .select({}) //to hide, 0 == false, so hidden
// being able to use query with saving data as variable.value

/* when they're chained final results are:
  
  Person.find({ age: 55 })
    .sort({ name: -1 })
    .limit(5)
    .select({ favoriteFoods: 0 })
    .exec(function(error, people) {
      //do something here
    });
    go to explanation article:[here](https://forum.freecodecamp.org/t/freecodecamp-challenge-guide-chain-search-query-helpers-to-narrow-search-results/301533)
    
*/



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;

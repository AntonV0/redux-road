// Reducer can be named anything - it's named reducer here for simplicity
const reducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather': {
      return {
        ...state,
        supplies: state.supplies + 15,
        days: state.days + 1
      };
    }

    case 'travel': {
      let supplyCheck = state.supplies - (20 * action.payload); // declaring this variable is optional
      if (supplyCheck <= 0) {
        return state;
      };
      return {
        ...state,
        supplies: state.supplies - (20 * action.payload),
        distance: state.distance + (10 * action.payload),
        days: state.days + action.payload
      };
    }

    case 'tippedWagon': {
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1
      };
    }

    case 'sell': {
      if (state.supplies - 5 <= 0) {
        return state;
      }
      return {
        ...state,
        supplies: state.supplies - 20,
        cash: state.cash + 5
      };
    }

    case 'buy': {
      if (state.cash -15 <= 0) {
        return state;
      };
      return {
        ...state,
        supplies: state.supplies + 25,
        cash: state.cash - 15
      };
    }

    case 'theft': {
      return {
        ...state,
        cash: state.cash / 2
      };
    }
    
    default:
      return state;
  }
}

const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
  cash: 200
};

let wagon = reducer(undefined, {});
console.log('Initial State...');
console.log(wagon);
console.log("");
/* Output:
Initial State...
{ supplies: 100, distance: 0, days: 0, cash: 200 }
*/

wagon = reducer(wagon, {type: 'travel', payload: 1}); 
console.log('Travelling for a day...');
console.log(wagon);
console.log("");
/* Output:
Travelling for a day...
{ supplies: 80, distance: 10, days: 1, cash: 200 }
*/

wagon = reducer(wagon, {type: 'gather'});
console.log('Gathering supplies...');
console.log(wagon);
console.log("");
/* Output:
Gathering supplies...
{ supplies: 95, distance: 10, days: 2, cash: 200 }
*/

wagon = reducer(wagon, {type: 'tippedWagon'});
console.log('Wagon has tipped!');
console.log(wagon);
console.log("");
/* Output:
Wagon has tipped!
{ supplies: 65, distance: 10, days: 3, cash: 200 }
*/

wagon = reducer(wagon, {type: 'travel', payload: 3});
console.log('Traveling for 3 days...');
console.log(wagon);
console.log("");
/* Output:
Traveling for 3 days...
{ supplies: 5, distance: 40, days: 6, cash: 200 }
*/

wagon = reducer(wagon, {type: 'sell'});
console.log('Try to sell (not enough supplies)...');
console.log(wagon);
console.log("");
/* Output:
Try to sell (not enough supplies)...
{ supplies: 5, distance: 40, days: 6, cash: 200 }
*/

wagon = reducer(wagon, {type: 'gather'});
console.log('Gathering supplies...');
console.log(wagon);
console.log("");
/* Output:
Gathering supplies...
{ supplies: 20, distance: 40, days: 7, cash: 200 }
*/

wagon = reducer(wagon, {type: 'sell'});
console.log('Selling supplies for cash...');
console.log(wagon);
console.log("");
/* Output:
Selling supplies for cash...
{ supplies: 0, distance: 40, days: 7, cash: 205 }
*/

wagon = reducer(wagon, {type: 'buy'});
console.log('Buying supplies with cash...');
console.log(wagon);
console.log("");
/* Output:
Buying supplies with cash...
{ supplies: 25, distance: 40, days: 7, cash: 190 }
*/

wagon = reducer(wagon, {type: 'theft'});
console.log('An outlaw robbed you!');
console.log(wagon);
/* Output:
An outlaw robbed you!
{ supplies: 25, distance: 40, days: 7, cash: 95 }
*/
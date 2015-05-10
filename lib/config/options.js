'use strict';

module.exports = {
  termsData: {
    'jaf_0': {
      numberOfBooks: 9,
      uploaded: 9,
      nursery: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      free: [0, 1, 2]
    },
    'jaf_1': {
      numberOfBooks: 8,
      uploaded: 8,
      nursery: [0, 1, 2, 3],
      free: [0]
    },
    'jaf_2': {
      numberOfBooks: 9,
      uploaded: 9,
      nursery: [],
      free: [0]
    },
    'jaf_3': {
      numberOfBooks: 10,
      uploaded: 10,
      nursery: [],
      free: [0]
    },
    'hdxm_0': {
      numberOfBooks: 9,
      uploaded: 9,
      nursery: [],
      free: [0]
    },
    'hdxm_1': {
      numberOfBooks: 10,
      uploaded: 4,
      nursery: [],
      free: [0]
    }    
  },
  //represents the number of stars that will be obtained (index) if answeredCorrectlyPercentage is equal or less than (value)
  //thus stars[0] === 0 means that 0 stars will be obtained if answeredCorrectlyPercentage is 0%
  //stars[1] === 0.5 means that 1 star will be ontained if answeredCorrectlyPercentage is > 0% and <= 50%
  //stars[2] === 0.75 means that 2 stars will be ontained if answeredCorrectlyPercentage is > 50% and <= 75%
  stars: [0, 0.5, 0.75, 1],
  numberOfStarsRequiredToUnlockIntermediate: 3
};
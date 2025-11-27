import { expect } from "chai";
import { shuffle } from "../src/shuffle.js";

describe("shuffle function", function () {
  it("should return an array of the same length", function () {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(originalArray);
    expect(shuffledArray).to.have.lengthOf(originalArray.length);
  });

  it("should contain all original elements", function () {
    const originalArray = [1, 2, 3, 4, 5];
    const shuffledArray = shuffle(originalArray);

    originalArray.forEach((element) => {
      expect(shuffledArray).to.include(element);
    });
  });

  it("should not modify the original array", function () {
    const originalArray = [1, 2, 3, 4, 5];
    const originalCopy = [...originalArray];
    shuffle(originalArray);

    expect(originalArray).to.deep.equal(originalCopy);
  });

  it("should shuffle the indexes of an array", function () {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let shuffledDifferently = false;

    // Run multiple times to ensure shuffling occurs (randomness check)
    for (let i = 0; i < 10; i++) {
      const shuffledArray = shuffle(originalArray);

      // Check if at least one element is in a different position
      const hasDifferentOrder = originalArray.some(
        (element, index) => shuffledArray[index] !== element
      );

      if (hasDifferentOrder) {
        shuffledDifferently = true;
        break;
      }
    }

    expect(shuffledDifferently).to.be.true;
  });

  it("should handle an empty array", function () {
    const emptyArray = [];
    const shuffledArray = shuffle(emptyArray);
    expect(shuffledArray).to.deep.equal([]);
  });

  it("should handle an array with one element", function () {
    const singleElementArray = [1];
    const shuffledArray = shuffle(singleElementArray);
    expect(shuffledArray).to.deep.equal([1]);
  });

  it("should work with arrays of objects", function () {
    const objectArray = [
      { term: "HTML", description: "HyperText Markup Language" },
      { term: "CSS", description: "Cascading Style Sheets" },
      { term: "JS", description: "JavaScript" },
    ];
    const shuffledArray = shuffle(objectArray);

    expect(shuffledArray).to.have.lengthOf(objectArray.length);
    objectArray.forEach((obj) => {
      expect(shuffledArray).to.deep.include(obj);
    });
  });
});

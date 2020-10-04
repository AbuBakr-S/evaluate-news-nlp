// 1. Import the js file to test
import { charCountUpdate } from "../src/client/js/formCharLimit"

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the formCharLimit length", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("The formCharLimit length is more than or equal to 0", () => {
        // 2. Define the input for the function, if any, in the form of variables/array
        

        // 3. Define the expected output, if any, in the form of variables/array


        // 4. The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
        // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher

        expect(length).toBeGreaterThanOrEqual(0);
    })
});
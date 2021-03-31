var removeDuplicates = function(nums) {
    let leftIndex = 0;
    let rightIndex = 1;
    console.log(leftIndex);
    console.log(rightIndex);

    while (rightIndex <= nums.length){
        console.log(leftIndex + ", " + rightIndex);
        console.log(nums);
        if (nums[leftIndex] == nums[rightIndex]){
            rightIndex++;
        } else {
            nums[++leftIndex] = nums[rightIndex++];
            console.log(nums);
        }
    }
    return leftIndex;
};

let array = [1, 1, 2];
removeDuplicates(array);
console.log(array);
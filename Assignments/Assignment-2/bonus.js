var findKthPositive = function(arr, k) {
    left = 0;
    right = arr.length -1;
    while ( left <= right ) {
        const mid = Math.floor( ( left + right ) / 2);
        const missing = arr[mid] - ( mid + 1 );
        if (missing < k) left = mid + 1;
        else right = mid - 1;
    }
    if (left === arr.length) return arr.length + k;
    if (left === 0) return k;
    
    const prevMissing = arr[left - 1] - left;
    return arr[left - 1] + (k - prevMissing);
};

console.log(findKthPositive([2,3,4,7,11], 5));

// missing numbers:
//1
//
//
//
//5
//6
//
//8
//9 / 5th missing /
//10

using Printf

function removeDuplicates(anArray)
    leftIndex = 1
    rightIndex = 2
    
    while rightIndex <= length(anArray)        
        if anArray[leftIndex] == anArray[rightIndex] 
            rightIndex = rightIndex + 1
        else
            leftIndex = leftIndex + 1
            anArray[leftIndex] = anArray[rightIndex]
            rightIndex = rightIndex + 1            
        end
    end
    return leftIndex
end

anArray = [1, 2, 2, 3, 4, 5, 5, 5, 6]
r = removeDuplicates(anArray)
println(resize!(anArray, r))

anArray = [1, 1, 1, 4, 5, 5, 5, 6, 9, 10]
r = removeDuplicates(anArray)
println(resize!(anArray, r))

anArray = [1, 1, 2]
r = removeDuplicates(anArray)
println(resize!(anArray, r))
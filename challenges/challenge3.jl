using Printf

function bubbleSort(anArray)
  
    for i = 1:length(anArray)
        for j = i:length(anArray)
            if anArray[i] > anArray[j]
                temp = anArray[j]
                anArray[j] = anArray[i]
                anArray[i] = temp
            end
        end
    end
end

anArray = [1, 3, 2]
bubbleSort(anArray)
println(anArray)

anArray = [9, 3, 1, 2, 6, 2, 7, 8, 9, 0]
bubbleSort(anArray)
println(anArray)

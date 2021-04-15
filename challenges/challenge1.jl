using Printf

function reverseArray(anArray)
    l = length(anArray)
    returnArray = Array{Int, 1}(undef, l)
    for i in 1:l
        returnArray[l-i+1] = anArray[i]
    end

    return returnArray
end

anArray = [5, 2, 4, 3]
r = reverseArray(anArray)
println(r)

anArray = [11, 22, 1, 1, 99, 101]
r = reverseArray(anArray)
println(r)
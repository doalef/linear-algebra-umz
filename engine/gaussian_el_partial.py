import numpy as np
import sys
import json

def Gaussian_Elim_PP(A, b):
    n =  len(A)
    if b.size != n:
        raise ValueError("Invalid argument: incompatible sizes between A & b.", b.size, n)
    
    for k in range(n-1):
        #largest pivot element
        maxindex = abs(A[k:,k]).argmax() + k
        if A[maxindex, k] == 0:
            raise ValueError("Matrix is singular.")

        #Swap rows
        if maxindex != k:
            A[[k,maxindex]] = A[[maxindex, k]]
            b[[k,maxindex]] = b[[maxindex, k]]
        for row in range(k+1, n):
            multiplier = A[row][k]/A[k][k]
            A[row][k] = multiplier
            for col in range(k + 1, n):
                A[row][col] = A[row][col] - multiplier*A[k][col]
            b[row] = b[row] - multiplier*b[k]
    x = np.zeros(n)
    k = n-1
    x[k] = b[k]/A[k,k]
    while k >= 0:
        x[k] = (b[k] - np.dot(A[k,k+1:],x[k+1:]))/A[k,k]
        k = k-1
    return x

A = np.array(json.loads(sys.argv[1]),float)
b = np.array(json.loads(sys.argv[2]),float)

print(json.dumps(Gaussian_Elim_PP(A, b).tolist()))
sys.stdout.flush
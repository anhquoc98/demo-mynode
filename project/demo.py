n = 10
print(n)
print(type(n))
# Số thập phân
from decimal import *
# getcontext().prec = 40
d = 10/3
print(d)
print(Decimal(10)/(3))
# Phân số
from fractions import *
a = Fraction(6,9)
b = Fraction(2,9)
c = a + b + 2
print(c)
# kiểu chuổi


# Mảng
for i in range(0,10,2):
    if i%2 ==0 and i>5:
        print(i)
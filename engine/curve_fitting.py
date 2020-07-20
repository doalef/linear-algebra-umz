import numpy as np	 
import matplotlib.pyplot as plot

# DATA SET
time = np.array([10,12.5,15,17.5,20,22.5,25,27.5,30,32.5,35,37.5,40,42.5,45,47.5,50]);
velocity = np.array([62.1,77.3,92.5,104,112.9,121.9,125,129.4,134,138.2,142.3,143.2,144.6,147.2,147.8,149.1,150.9])

model = np.poly1d(np.polyfit(time,velocity,5))

print(model)

xp = np.linspace(0,60,100)
axes = plot.axes()	 
axes.set_xlim([0,60])	 
axes.set_ylim([40,180])	 
plot.scatter(time,velocity)
plot.plot(xp,model(xp), c='g')
plot.show()

import numpy as np

training_inputs = np.array([[0,0,1],
                            [0,1,1],
                            [1,0,1],
                            [1,1,1]])
training_output = np.array([[0,1,1,1]]).T
# print(np.shape(training_output))

# initialize the weight within range(-1,1), there are many other science technique for this, e.g. initialize to zero.
synaptic_weights = 2 * np.random.random((3,1))-1

print("Random starting synpatic weigths: ")
print(synaptic_weights)

def sigmoid(x):
    return 1/(1+np.exp(-x))

def sigmoid_derivative(x):
    return x*(1-x)

def predict(inputs):
    inputs = inputs.astype(float)
    output = sigmoid(np.dot(inputs, synaptic_weights))
    return output


for iteration in range(20000):
    input_layer = training_inputs
    output_layer = sigmoid(input_layer @ synaptic_weights) # @ is np.dot for matrix multiplication
    error = training_output - output_layer
    adjusted_weight = error*sigmoid_derivative(output_layer)
    adjusted_weight = np.dot(input_layer.T, adjusted_weight)
    # weight updating
    synaptic_weights += adjusted_weight

print("Synaptic weight after training: ")
print(synaptic_weights)
print('Output after training: ')
print(output_layer)



---
title: 'TensorFlow Project01: Predicting house price'
date: '2020-06-20  22:40:59'
categories:
  - TensorFlow 2.X
tags:
  - TensorFlow 2.X
excerpt: >-
  In traditional programming, we usually solve the problem by defining the rules, algorithms, or a series of procedures to implement a task. However, in Modern Machine Learning programming, we train our model to find/learn the rules, or pattern, to solve a problem by feeding them the datas(e.g. X is Y,  this person is called Mother...), which is kinda like how human learned.

    Extra things: Most of robotic designing procedures can be substituted by three module: Perceptor(What you can see, e.g GPS, ), Controller(How to do with those data and what action you want to take based on what you saw, e.g. some instruction to move the motor), and Actuator(what action you can take, e.g. Hammer, Wheel...)
---
### Abstract
  In traditional programming, we usually solve the problem by defining the rules, algorithms, or a series of procedures to implement a task. However, in Modern Machine Learning programming, we train our model to find/learn the rules, or pattern, to solve a problem by feeding them the datas(e.g. X is Y,  this person is called Mother...), which is kinda like how human learned.

  Extra things: Most of robotic designing procedures can be substituted by three module: Perceptor(What you can see, e.g GPS, ), Controller(How to do with those data and what action you want to take based on what you saw, e.g. some instruction to move the motor), and Actuator(what action you can take, e.g. Hammer, Wheel...)
### Introduction: 

![housing-price](/assets/images/2020-06-20-housing-price/download.jpg
)

In this exercise you'll try to build a neural network that predicts the price of a house according to a simple formula.
So, imagine if house pricing was as easy as a house costs 50k + 50k per bedroom, so that a 1 bedroom house costs 100k, a 2 bedroom house costs 150k etc.

How would you create a neural network that learns this relationship so that it would predict a 7 bedroom house as costing close to 400k etc.

Hint: Your network might work better if you scale the house price down. You don't have to give the answer 400...it might be better to create something that predicts the number 4, and then your answer is in the 'hundreds of thousands' etc.


### Code Explanation:

Define the true function:
<?prettify?>
<pre class="prettyprint cpp-html linenums">
import tensorflow as tf
import numpy as np

# x: int, number of bedroom
# return: float, housing cost
def true_fun(x):
    return x*5000.0 + 5000.0

print(true_fun(1))
</pre>

Define the model and train the neural network:
<?prettify?>
<pre class="prettyprint cpp-html linenums">
import tensorflow as tf
import numpy as np

model = tf.keras.models.Sequential([tf.keras.layers.Dense(units=1, input_shape=[1])])
model.compile(optimizer='sgd', loss='mean_squared_error')

xs = np.array([1.0, 2.0, 3.0, 4.0, 5.0, 6.0], dtype=float)
ys = np.array([10000.0, 15000.0, 20000.0, 25000.0, 30000.0, 35000.0], dtype=float)/100
# [true_fun(i) for i in xs]

model.fit(xs, ys, epochs=1000)
print(model.predict([7])*100)

# Note: scale down the number could make the training process easie
</pre>


* **Sequential**: successive layers are defined as sequence, hence the word for sequential.
* **Dense**: defines a layer of fully connected neurons
  * For example: we want to have one layer, with one neurons, and input with shape [1], then we can do like this: 
  $$ model = tf.keras.models.Sequential([tf.keras.layers.Dense(units=1, input_shape=[1])]) $$
  - units=1: only use 1 neuron for this layer
  - input_shape=[1]: input is 1 dimensional data
- **loss functions and optimizers**: The nerual network has no idea of the relationship between X and Y, so it start with a guess, and it will then use the given data to measure how good or how bad its guess was. The loss function measures this. And then, the given data will pipe to optimizer, and it will generate a new and improved guess that expected to be better than before. As the guesses getting better and betterm, the accuracy will approach to 100%, and the term convergence is used, and it tell us when this training process should be stopped. 
- **epochs**: epoch=500 means it will go through the training loop 500 times. The training loop is what we described eariler. Make a guess, measure how good or how bad the guesses with the loss function, then use the optimizer and the data to make another guess and repeat this. 


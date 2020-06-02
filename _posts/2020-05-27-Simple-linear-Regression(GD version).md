### Simple Linear Regression 

## 

### Description

We will introduce an example in using gradient descent to compute the best parameter `w` and `b ` in a simple linear function $y_i = wx_i + b + \epsilon, where  \ \epsilon ~ N(0, 0.01^2)$. 





### Code

Step1: pseudo data generation

Assume we want to gradient descent to fit a function: $y = 1.477x + 0.089$. This is the true function, but, in reality, we would never know the true value, that’s why we want to **optimize** a **Numerical Solution**, instead of to derive a precise **Closed-form Solution**. Enough said, let’s add some Gaussian Noise to the function, with mean = 0, and SD = 0.01.
$$
y_i = 1.477x_i + 0.089 + \epsilon, where  \ \epsilon ~ N(0, 0.01^2)
$$


```python
data = []
for i in range(100):
    x = np.random.uniform(-10., 10.)
    eps = np.random.normal(0., 0.01)
    y = 1.477*x + 0.089 + eps
    data.append([x, y])
data = np.array(data)
```




---
layout: post
title: Basics 2. Linear regression for dummies
subtitle: Deriving the least squares solution step-by-step
---

<span style="color:red"> In this post I'm going to assume you know the basics of linear algebra. By that I mean an
 appreciation that the square of a vector is not simply elementwise,  instead  $\mathbf{y}^2 = \mathbf{y}^T\mathbf{y}$. If you are unfamiliar
 with this, watch [**this video**](https://www.youtube.com/watch?v=qGhfoT807l0) and come back! (Also check out the
 other videos in that Linear Alegbra review playlist for bonus points) </span>
 
## Stage setting:
 
Okay, so last [post](../2017-01-02-lines-of-best-fit) we agreed we were modelling a datapoint $\mathbf{y}_i$ as being
 generated from a datapoint $\mathbf{x}_i$by the following relationship:

$$ \mathbf{y_i} \approx  w\mathbf{x_i} + b $$

That is to say, we take our x value, multiply it by some number and then add another number to it and magically end
 up approximation of our y value. This works because the  coefficients (or parameters) $w$ & $b$ have not been chosen
 at random, they've been fit using data. The most commonly used way to fit these coefficients is called least squares, which
 I told you has the solution:
  
$$ (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^{T}\mathbf{y} = \mathbf{\beta} $$

But how do we get to this? Minimise residual some of squares... (cba to write the transition yet)
 
## Just get the markdown written - rough:

<span style="color:red">**We are going to do everything stupidly step by step...**</span>

$$ 
RSS(\mathbf{\beta}) = \sum_{i=1}^{n}{(\mathbf{y}_i-\mathbf{\beta}_0-\sum_{j=1}^p\mathbf{x}_{ij}\mathbf{\beta}_j)^2}
 = \sum_{i=1}^n{(\mathbf{y}_i - \mathbf{X}_i\mathbf{\beta})^2} = (\mathbf{y}-\mathbf{X}\mathbf{\beta})^2
$$

As $(\mathbf{y}-\mathbf{X}\mathbf{\beta})$ is a vector, to square it we need to take the dot product:
 $(\mathbf{y}-\mathbf{X}\mathbf{\beta})^T(\mathbf{y}-\mathbf{X}\mathbf{\beta})$.
The aim is the to find the weights vector $\beta$, that gives us the minimum value for RSS. We do this by taking the 
derivative of RSS with respect to beta, and then solve for $\mathbf{\beta}$ when the derivative is 0. This solution, when
  $\frac{\partial RSS}{\partial \mathbf{\beta}} = 0$, will give us the $\mathbf{\beta}$ that corresponds to either a 
 maximum or minimum of $RSS(\mathbf{\beta})$. Our function is a bowl though! (as quadratic with respect to $\mathbf{\beta}$,
  therefore a parabola).
  

$$ RSS(\beta) = (y-X\beta)^T(y-X\beta) $$


$$ \frac{\partial RSS}{\partial \beta} = \frac{\partial}{\partial \beta} \Big( (y-X\beta)^T(y-X\beta) \Big) $$


$$ \frac{\partial RSS}{\partial \beta} = \frac{\partial}{\partial \beta} \Big( y^Ty - y^TX\beta -\beta^TX^Ty +\beta^TX^TX\beta \Big) $$

Notice that the two inner terms are scalars as they are the dot products of two vectors, and a scalar transposed is just
 the original scalar. Therefore we can transpose either term. Will do this step by step...:
 
$$ \frac{\partial RSS}{\partial \beta} = \frac{\partial}{\partial \beta} \Big( y^Ty - y^TX\beta - (\beta^TX^Ty)^T +\beta^TX^TX\beta \Big) $$


$$ \frac{\partial RSS}{\partial \beta} = \frac{\partial}{\partial \beta} \Big( y^Ty - y^TX\beta - y^TX\beta +\beta^TX^TX\beta \Big) $$


$$ \frac{\partial RSS}{\partial \beta} = \frac{\partial}{\partial \beta} \Big( y^Ty - 2y^TX\beta +\beta^TX^TX\beta \Big) $$


Now take the derivative! Note the first term disappears as does not depend on $\beta$. 

$$ \frac{\partial RSS}{\partial \beta} = 0 - 2\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big) $$

<span style="color:red"> ** Drop out to summation symbols here and do normal derivatives, then reconvert to matrix notation </span>

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + (X^TX + (X^TX)^T)\beta $$

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + (X^TX + X^TX)\beta $$

$$\frac{\partial RSS}{\partial \beta} = - 2X^Ty + 2X^TX\beta $$

$$\frac{\partial RSS}{\partial \beta} = -2X^T(y - X\beta) $$

Now set to 0 and solve for beta:

$$ \frac{\partial RSS}{\partial \beta} = - 2X^Ty + 2X^TX\beta $$

$$ 0 = - 2X^Ty + 2X^TX\beta $$

$$ 2X^Ty = 2X^TX\beta $$

$$ X^Ty = X^TX\beta $$

$$ (X^TX)^{-1}X^Ty = (X^TX)^{-1}X^TX\beta $$ 

$$ (X^TX)^{-1}X^Ty = \mathbb{1}\beta $$

$$ (X^TX)^{-1}X^Ty = \beta $$
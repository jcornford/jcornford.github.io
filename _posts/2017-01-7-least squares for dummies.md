---
layout: post
title: Basics 2. Linear regression for dummies
subtitle: Deriving the least squares solution step-by-step
---

<span style="color:red"> In this post I'm going to assume you know the basics of linear algebra. If you are unfamiliar
 with matrix vector multiplication, [**this video**](https://www.youtube.com/watch?v=qGhfoT807l0) is all you need. (Also check out the
 other videos in that Linear Alegbra review playlist for bonus points) </span>
 
## Stage setting:
 
Okay, so last [post](../2017-01-02-lines-of-best-fit) we agreed we were modelling a datapoint $\mathbf{y}_i$, from a vector of $\mathbf{y}$'s, as being
generated from a corresponding datapoint $\mathbf{x}_i$, from a vector of $\mathbf{x}$'s, by the following relationship:

$$ \mathbf{y_i} \approx  w\mathbf{x_i} + b $$

That is to say, we take our x value, multiply it by some number and then add another number to it and magically end
 up approximation of our y value. This works because the parameters $w$ & $b$ have not been chosen
 at random, they've been fit using data (normally the full $\mathbf{x}$ and $\mathbf{y}$ vectors). The most popular way to fit these parameters is called **least squares**, in which
 we pick our parameters to minimise a quantity called the **residual sum of squares**. Last post I told you that the
 solution to the least squares approch was: 
  
$$ (\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^{T}\mathbf{y} = \mathbf{\beta} $$

But how do we get to this?

**First** we need to appreciate that when we loop over all of our datapoints, $ \sum_i^n \mathbf{y_i} \approx  w\mathbf{x_i} + b $,
this can be written concisely using matrix notation as:

$$ \mathbf{y} \approx \mathbf{X}\mathbf{\beta} $$ 

Here the bias term has been absorbed into a parameter vector, $\mathbf{\beta}$, and our original $\mathbf{x}$ vector of datapoints
has been augmented with a column of ones. <span style="color:red"> If this doesn't make sense to you, make sure you have watched the [videos](https://www.youtube.com/watch?v=qGhfoT807l0)
in the link above</span>. When written out in full the equivalence of notation should be clear:

$$
\begin{bmatrix} y_1\\ y_2\\ \vdots\\ y_N \end{bmatrix} \approx 

\begin{bmatrix}
  1   & x_1  \\
  1  & x_2   \\
  \vdots&\vdots\\
  1   & x_N   
\end{bmatrix}

\begin{bmatrix}
\beta_1\\
\beta_2
\end{bmatrix}
$$

So you can think about matrix notation as just getting rid of pesky ```for i in range(): ``` loops (better known as $ \sum$ signs).

**Second**, what is the **residual sum of squares**? This is just the squared difference between all of our estimates of $\mathbf{y_i}$,
 and the actual values of $\mathbf{y_i}$. See the graph below for a visual explanation (<span style="color:red">not done just yet</span>)!
  Here I've come slightly unstuck with my previous notation... I should have binned the $\approx$ sign earlier and instead written $\mathbf{\hat{y}} = \mathbf{X}\mathbf{\beta}$,
to show that $ \mathbf{X}\mathbf{\beta}$ just gives us an estimate of the vector $\mathbf{y}$. Precisely:
 
 $$\mathbf{\hat{y}} = \mathbf{X}\mathbf{\beta}$$
 
 $$ \mathbf{y} = \mathbf{\hat{y}} + \mathbf{\epsilon} $$
 
 Where $\epsilon$ is a vector of errors. Therefore, the residual sum of squares is just $\epsilon ^2$!

## Residual sum of squares:
Given a particular $\mathbf{\beta}$ vector, we can calculate the squared sum of the difference between the
estimates that particular parameter vector gives us and the actual values ($\epsilon ^2$). This can be thought of as
 calculating a measurement of the total lack of fit given by that $\mathbf{\beta}$ :

$$ RSS(\mathbf{\beta}) = (\mathbf{y}-\mathbf{X}\mathbf{\beta})^2 $$

At this point, it is probably also worth refreshing what the neat matrix notation above actually means. Apparently, it is 
good for ones soul to switch in and out of matrix notation on a whim...

$$ 
RSS(\mathbf{\beta}) = \sum_{i=1}^{n}{(\mathbf{y}_i-\sum_{j=1}^p\mathbf{X}_{ij}\mathbf{\beta}_j)^2}
 = \sum_{i=1}^n{(\mathbf{y}_i - \mathbf{X}_{i,:}\mathbf{\beta})^2} = (\mathbf{y}-\mathbf{X}\mathbf{\beta})^2
$$

Okay, so the overall aim is the to find the parameter vector $\beta$, that gives us the minimum value for RSS. This is done by taking the 
derivative of RSS with respect to beta, and then solving for $\mathbf{\beta}$ when the derivative is 0. This solution, when
  $\frac{\partial RSS}{\partial \mathbf{\beta}} = 0$, will give us the $\mathbf{\beta}$ that corresponds to either a 
 maximum or minimum of $RSS(\mathbf{\beta})$.<span style="color:red"> *Our function is a bowl though! (as quadratic with respect to $\mathbf{\beta}$,
  therefore a parabola) - this needs to be clearer*</span> . To start, $(\mathbf{y}-\mathbf{X}\mathbf{\beta})$ is a vector, so to square it we need to take the dot product:
 $(\mathbf{y}-\mathbf{X}\mathbf{\beta})^T(\mathbf{y}-\mathbf{X}\mathbf{\beta})$.
  

$$ RSS(\beta) = (y-X\beta)^T(y-X\beta) $$


$$ RSS(\beta)=  y^Ty - y^TX\beta -\beta^TX^Ty +\beta^TX^TX\beta  $$

Notice that the two inner terms are scalars as they are the dot product of two vectors, and a scalar transposed is just
 the original scalar. Therefore, we can transpose either term:
 
$$ RSS(\beta) = y^Ty - y^TX\beta - (\beta^TX^Ty)^T +\beta^TX^TX\beta  $$


$$ RSS(\beta) =  y^Ty - y^TX\beta - y^TX\beta +\beta^TX^TX\beta  $$


$$ RSS(\beta) =  y^Ty - 2y^TX\beta +\beta^TX^TX\beta  $$

## Taking the derivative 
Now we are in a position to take the derivative! Note the first term disappears as does not depend on $\beta$. 

$$ \frac{\partial RSS}{\partial \beta} = 0 - 2\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big) $$

<span style="color:red"> ** Drop out to summation symbols here and do normal derivatives, then reconvert to matrix notation </span>

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + (X^TX + (X^TX)^T)\beta $$

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + (X^TX + X^TX)\beta $$

$$\frac{\partial RSS}{\partial \beta} = - 2X^Ty + 2X^TX\beta $$

$$\frac{\partial RSS}{\partial \beta} = -2X^T(y - X\beta) $$

## Finishing up 
Now we just need to set to 0 and solve for beta:

$$ \frac{\partial RSS}{\partial \beta} = - 2X^Ty + 2X^TX\beta $$

$$ 0 = - 2X^Ty + 2X^TX\beta $$

$$ 2X^Ty = 2X^TX\beta $$

$$ X^Ty = X^TX\beta $$

$$ (X^TX)^{-1}X^Ty = (X^TX)^{-1}X^TX\beta $$ 

$$ (X^TX)^{-1}X^Ty = \mathbb{1}\beta $$

$$ (X^TX)^{-1}X^Ty = \beta $$
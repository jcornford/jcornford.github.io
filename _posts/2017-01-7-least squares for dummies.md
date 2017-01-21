---
layout: post
title: Basics 2&#58 Linear regression for dummies
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

So you can kind of think about matrix notation as just getting rid of pesky ```for i in range(): ``` loops (better known as $ \sum$ signs).
This is not completely equivalent...

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

At this point, it is probably worth refreshing what the neat matrix notation above actually means. Apparently, it is 
good for ones soul to switch in and out of matrix notation on a whim...

$$ 
RSS(\mathbf{\beta}) = \sum_{i=1}^{n}{(\mathbf{y}_i-\sum_{j=1}^p\mathbf{X}_{ij}\mathbf{\beta}_j)^2}
 =  (\mathbf{y}-\mathbf{X}\mathbf{\beta})^2
$$

Okay, so the overall aim is the to find the parameter vector $\beta$, that gives us the minimum value for RSS. This is done by taking the 
derivative of RSS with respect to beta, and then solving for $\mathbf{\beta}$ when the derivative is 0. This solution, when
  $\frac{\partial RSS}{\partial \mathbf{\beta}} = 0$, will give us the $\mathbf{\beta}$ that corresponds to either a 
 maximum or minimum of $RSS(\mathbf{\beta})$. Our function is a bowl though! RSS is the sum of squares so it is always positive, therefore it must be a bowl (we could also look
 at second derivatives, but that is for later!). To start, $(\mathbf{y}-\mathbf{X}\mathbf{\beta})$ is a vector, so to square it we need to take the dot product:
 $(\mathbf{y}-\mathbf{X}\mathbf{\beta})^T(\mathbf{y}-\mathbf{X}\mathbf{\beta})$.
  

$$ RSS(\beta) = (y-X\beta)^T(y-X\beta) $$


$$ RSS(\beta)=  y^Ty - y^TX\beta -\beta^TX^Ty +\beta^TX^TX\beta  $$

Notice that the two inner terms are scalars, as they are the dot product of two vectors, and a scalar transposed is just
 the original scalar. Therefore, we can transpose either term:
 
$$ RSS(\beta) = y^Ty - y^TX\beta - (\beta^TX^Ty)^T +\beta^TX^TX\beta  $$


$$ RSS(\beta) =  y^Ty - y^TX\beta - y^TX\beta +\beta^TX^TX\beta  $$


$$ RSS(\beta) =  y^Ty - 2y^TX\beta +\beta^TX^TX\beta  $$

## Taking the derivative 
Now we are in a position to take the derivative! Note the first term disappears as does not depend on $\beta$. 

$$ \frac{\partial RSS}{\partial \beta} = 0 - 2\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big) $$

You'd be forgiven for feeling like we must be a little stuck here, as I said you only needed to know the basics of linear algebra. But let's break down what's going on. Notice that
the two terms are just scalars, one being the sum of the product between our estimates, $\mathbf{\hat{y}}$, and $\mathbf{y}$ itself;
the other the sum of the square of our estimates, $\mathbf{\hat{y}}$. We want to know the expression for how these scalar
quantities change when we nudge around our parameter column vector, $\beta$.


If the dimensions of the terms are written out, it's also easy to see that $y^TX$ is just going to be a $1\times P$ vector, which I'll call 
$c^T$, as $y^TX$ is $1\times N N\times P$. Similarly, $X^TX$ is a $P\times P$ matrix, which I'll call $A$, as $X^TX \$ is
 $P\times N N \times P$. We can therefore simplify our expression:
  
$$ \frac{\partial RSS}{\partial \beta} = -2\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) $$

Here, we are actually in a position to cheat, and [look up](https://en.wikipedia.org/wiki/Matrix_calculus#Scalar-by-vector_identities) the
answers (check out the 1st and 3rd rows below the solid line, replacing $x$ for $\beta$ and $a$ for $c$). We could directly use the identities and **skip the next part**:

$$ \frac{\partial}{\partial \beta} \Big(c^T\beta \Big)  = c $$

$$ \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) = (A+A^T)\beta $$
 

### Optional section to derive matrix calculus identities:

However, we don't need to cheat! Let's
start with $\frac{\partial}{\partial \beta} \Big(c^T\beta \Big)$, which it just the dot product between $c$ and $\beta$. 

$$\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) =  \frac{\partial}{\partial \beta} \Big(\sum_i^N c_i\beta_i \Big)$$

We want to know how this dot product changes as $\beta$ is altered. We can write this as a vector of partial derivatives:

$$
\frac{\partial}{\partial \beta} \Big(\sum_i^P c_i\beta_i \Big) = 

\begin{bmatrix}
 \frac{\partial}{\partial \beta_1} \Big(\sum_i^P c_i\beta_i \Big)  \\
 \frac{\partial}{\partial \beta_2} \Big(\sum_i^P c_i\beta_i \Big)   \\
  \vdots \\
  \frac{\partial}{\partial \beta_N} \Big(\sum_i^P c_i\beta_i \Big)  
\end{bmatrix}

= \begin{bmatrix}
 \frac{\partial}{\partial \beta_1} \Big(c_1\beta_1\Big) +0 \dots +0   \\
 0 + \frac{\partial}{\partial \beta_2} \Big(c_2\beta_2\Big)  \dots +0    \\
  \vdots \\
 0 + 0 \dots  \frac{\partial}{\partial \beta_P} \Big(c_P\beta_P\Big)  
\end{bmatrix}

= \begin{bmatrix}
 c_1\beta_1  \\
 c_2\beta_2 \\
  \vdots \\
 c_N\beta_N 
\end{bmatrix}

$$

Therefore the derivative of the dot product $c^T\beta$ ends up just being $c$:

$$\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) =  c$$

As $(c^T)^T = c$, we just need to take the transpose of our original $y^TX$ term:

$$\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) =  (y^TX)^T = X^Ty$$

and substituting back in to our simplified expression, we are one derivative down!

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) $$

Now we just have $\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big)$, which is our simplified version
of $\frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big)$, to deal with. This is more complicated, but
again, we can just break it down to summation notation.

$$ \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
\frac{\partial RSS}{\partial \beta}\Big(\sum_{i=1}^p\sum_{j=1}^p\beta_i A_{ij}\beta_j \Big)$$

However, now we have a quadratic form, unlike our linear form from before with $c^T$. 
But the derivative is a linear operator, so we can move it inside the summation signs...

$$\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
 \sum_{i=1}^p\sum_{j=1}^p \frac{\partial RSS}{\partial \beta} \beta_i A_{ij}\beta_j $$

The individual terms we are now taking the derivative of are just scalars. So we can apply techniques from univarate calculus.
In this case we can deploy the product rule - which is $\frac{d}{dx}u(x)v(x) = u(x)\frac{dv(x)}{dx}+\frac{du(x)}{dx}v(x)$.

$$
\sum_{i=1}^p\sum_{j=1}^p \frac{\partial}{\partial \beta} \beta_i A_{ij}\beta_j = 
\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta}\Big] $$

Again, $\partial\beta$ is a vector of partial derivative notation:

$$

\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
\begin{bmatrix}
  \sum_{i=1}^p\sum_{j=1}^p \frac{\partial}{\partial \beta_1}\beta_i A_{ij}\beta_j   \\
 \sum_{i=1}^p\sum_{j=1}^p \frac{\partial}{\partial \beta_2}\beta_i A_{ij}\beta_j    \\
  \vdots \\
   \sum_{i=1}^p\sum_{j=1}^p\frac{\partial}{\partial \beta_P}\beta_i A_{ij}\beta_j  
\end{bmatrix}

= \begin{bmatrix}
\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta_1} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta_1}\Big]\\
\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta_2} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta_2}\Big]\\

 \vdots \\
\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta_P} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta_P}\Big]\\

\end{bmatrix}
$$

If we look only at $\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta_P} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta_P}\Big]
$, we can see that the left hand term will evaluate to 0 whenever $\beta_i \neq \beta_P$, and likewise the right hand is 0 whenever $\beta_j \neq \beta_P$. Therefore:

$$ \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =

\begin{bmatrix}
\sum_{j=1}^p \frac{\partial \beta_1}{\partial \beta_1} A_{1j}\beta_j + \sum_{i=1}^p \beta_i \frac{\partial A_{i1}\beta_1}{\partial \beta_1}\\
\sum_{j=1}^p \frac{\partial \beta_2}{\partial \beta_2} A_{2j}\beta_j + \sum_{i=1}^p \beta_i \frac{\partial A_{i2}\beta_2}{\partial \beta_2}\\

 \vdots \\
\sum_{j=1}^p \frac{\partial \beta_P}{\partial \beta_P} A_{Pj}\beta_j + \sum_{i=1}^p \beta_i \frac{\partial A_{iP}\beta_P}{\partial \beta_P}\\

\end{bmatrix}
$$

Now if we finally take the derivative...

$$
\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =

\begin{bmatrix}
\sum_{j=1}^p A_{1j}\beta_j + \sum_{i=1}^p \beta_i A_{i1} \\
\sum_{j=1}^p A_{2j}\beta_j + \sum_{i=1}^p \beta_i A_{i2}\\

 \vdots \\
\sum_{j=1}^p A_{Pj}\beta_j + \sum_{i=1}^p \beta_i A_{iP}\\

\end{bmatrix}
$$


Okay... Now we just need to convert back to matrix notation! First, the left-hand side sum is just the standard form of
a matrix vector product, each entry in $\beta$ sums over the corresponding column of $A$:

$$
\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
A\beta  +\begin{bmatrix}
 \sum_{i=1}^p \beta_i A_{i1} \\
\sum_{i=1}^p \beta_i A_{i2}\\

 \vdots \\
 \sum_{i=1}^p \beta_i A_{iP}\\

\end{bmatrix}
$$

For the right-hand side sum, each entry of $\beta$ instead is summing over the rows of $A$. This is equivalent to transposing the matrix
before taking the 
matrix vector product:

$$
\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
A\beta  +A^T\beta = (A+A^T)\beta
$$

### End of optional section!
 
Now we can substitute these identities into our original equation... Phew

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
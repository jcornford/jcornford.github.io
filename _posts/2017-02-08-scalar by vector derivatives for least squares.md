---
layout: post
title: Scalar-by-vector derivatives
subtitle: The vector calculus needed for deriving the least squares solution
---

Here we are taking a break from the last [post](../2017-02-07-least-squares-for-dummies) and going to go through, step by step, the solution to:

$$ \frac{\partial RSS}{\partial \beta} = -2\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) $$

Which is our simplified form of:

$$ \frac{\partial RSS}{\partial \beta} = 0 - 2\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) + \frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big) $$

Remember, with regards to the dimensions of the terms, $c^T$ is a $1\times P$ vector
 as $y^TX$ is $1\times N N\times P$. Similarly, $A$ is a $P\times P$ matrix as $X^TX \$ is
 $P\times N N \times P$. 
<br>

## Term 1:  $\frac{\partial}{\partial \beta} \Big(c^T\beta \Big)$, which evaluates to just $c$

---

Let's start with $\frac{\partial}{\partial \beta} \Big(c^T\beta \Big)$, the dot product between $c$ and $\beta$. 

$$\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) =  \frac{\partial}{\partial \beta} \Big(\sum_i^P c_i\beta_i \Big)$$

We want to know how this dot product changes as the vector $\beta$ is altered. We can write this as a vector of partial derivatives:

$$
\frac{\partial}{\partial \beta} \Big(\sum_i^P c_i\beta_i \Big) = 

\begin{bmatrix}
 \frac{\partial}{\partial \beta_1} \Big(\sum_i^P c_i\beta_i \Big)  \\
 \frac{\partial}{\partial \beta_2} \Big(\sum_i^P c_i\beta_i \Big)   \\
  \vdots \\
  \frac{\partial}{\partial \beta_P} \Big(\sum_i^P c_i\beta_i \Big)  
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
 c_P\beta_P 
\end{bmatrix}

$$

Therefore the derivative of the dot product $c^T\beta$ ends up just being $c$:

$$\frac{\partial}{\partial \beta} \Big(c^T\beta \Big) =  c$$

As $(c^T)^T = c$, we just need to take the transpose of our original $y^TX$ term:

$$\frac{\partial}{\partial \beta} \Big(y^TX\beta \Big) =  (y^TX)^T = X^Ty$$

and substituting back in to our simplified expression, we are one derivative down!

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) $$

<br>

---


## Term 2:  $\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big)$, which becomes $(A+A^T)\beta$,
Now we just have $\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big)$, which is our simplified version
of $\frac{\partial}{\partial \beta} \Big(\beta^TX^TX\beta \Big)$. This is more complicated than term 1, but
again, we can just break it down to (double) summation notation.

$$ \frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
\frac{\partial RSS}{\partial \beta}\Big(\sum_{i=1}^p\sum_{j=1}^p\beta_i A_{ij}\beta_j \Big)$$

However, now we have a quadratic form, unlike our linear form from before with $c^T$, so we can't follow the same approach. 
The derivative operator is a linear operator though, so we can move it inside the summation signs...

$$\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
 \sum_{i=1}^p\sum_{j=1}^p \frac{\partial RSS}{\partial \beta} \beta_i A_{ij}\beta_j $$

The individual terms we are taking the derivative of are just scalars. So we can apply techniques from univarate calculus.
In this case we can deploy the product rule - which is $\frac{d}{dx}u(x)v(x) = u(x)\frac{dv(x)}{dx}+\frac{du(x)}{dx}v(x)$.

$$
\sum_{i=1}^p\sum_{j=1}^p \frac{\partial}{\partial \beta} \beta_i A_{ij}\beta_j = 
\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta}\Big] $$

As before in term 1, $\partial\beta$ is just a vector of partial derivative notation, and we can apply the product rule to the elements of this vector:

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

If we look only at one of the entries, $\sum_{i=1}^p\sum_{j=1}^p \Big[ \frac{\partial \beta_i}{\partial \beta_P} A_{ij}\beta_j + \beta_i \frac{\partial A_{ij}\beta_j}{\partial \beta_P}\Big]
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
a matrix vector product, as each entry in $\beta$ sums over the corresponding column of $A$:

$$
\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
A\beta  +\begin{bmatrix}
 \sum_{i=1}^p \beta_i A_{i1} \\
\sum_{i=1}^p \beta_i A_{i2}\\

 \vdots \\
 \sum_{i=1}^p \beta_i A_{iP}\\

\end{bmatrix}
$$

In contrast, for the right-hand side sum, each entry of $\beta$ is summing over the rows of $A$. This is equivalent to transposing the matrix
before taking the 
matrix vector product:

$$
\frac{\partial}{\partial \beta} \Big(\beta^TA\beta \Big) =
A\beta  +A^T\beta = (A+A^T)\beta
$$
 
Now we can substitute these identities into our original equation...

$$\frac{\partial RSS}{\partial \beta} = 0 - 2X^Ty + (X^TX + (X^TX)^T)\beta $$

Phew... (next time I'm looking this up on wikipedia!)

---
layout: post
title: Ruminating on the Ridge
subtitle: Regularising least squares with the squared $l_2$ norm]
author: Jonathan Cornford
published: false
---

Ridge regression is an extension of least squares in which we impose a penalty on the size of the regression coefficients.
This results in the shrinkage of the estimated coefficients towards 0 (biasing the estimators), and a reduction in their variance. Adding the squared $l_2$ norm
also has a nice interpretation of stabilising under-determined systems that we will discuss.

## Introducing Ridge Regression:
Ridge regression, also called Tikhonov regularisation, adds the sum of the squared regression coefficients (or equivalently the squared $l_2$ norm of $\beta$) as a cost function to the residual sum of squares.
 We are therefore selecting a $\beta$ vector to minimise a **penalised** residual sum of squares:

$$ PRSS_{l_2} =  \big( \sum_{i=1}^N y_i - \beta_0 - \sum_{j=1}^pX_{ij} \beta_j \big)^2 + \lambda \sum_{j=1}^p \beta_j^2$$

Where $\lambda$ is a positive valued scalar that controls the amount of penalisation against having large weights. 

Note we are not including the intercept term $\beta_0$ in the cost function, and, further on, I will assume input matrix $X$ has been centered around
0, so we no longer need to augment it with a column of ones in order to incorporate $\beta_0$ in our matrix notation. Also, it is equally important to appreciate
 that the $\beta$ vector solution will be dependent on the units, or scaling, of the inputs - so the different inputs (or columns of $X$) should be standardised  before solving for $\beta$.

## Closed form solution:
The derivation of the closed form solution to regularised least squares follows a similar path to minimising the un-penalised residual sum of squares, which we went through
in [post 2](../2017-02-07-least-squares-for-dummies).

If we start with matrix notation form:

$$ PRSS_{l_2} = (y- X\beta)^T(y-X\beta) + \lambda \beta^T\beta $$

and then jump to just before the end of the [post 2](..\2017-02-08-least-squares-for-dummies) we have:

$$\frac{\partial PRSS_{l_2}}{\partial \beta} = -2X^T(y - X\beta) + \lambda \frac{\partial\beta^T\beta}{\partial \beta} $$

To take the derivative of $\beta^T\beta$, with respect to a vector of partial derivatives $\partial\beta$, we can quickly drop in and out of summation notation:

$$
\frac{\partial}{\partial \beta} \Big(\sum_i^P \beta_i^2 \Big) = 

\begin{bmatrix}
 \frac{\partial}{\partial \beta_1} \Big(\sum_i^P \beta_i^2 \Big)  \\
 \frac{\partial}{\partial \beta_2} \Big(\sum_i^P \beta_i^2 \Big)   \\
  \vdots \\
  \frac{\partial}{\partial \beta_P} \Big(\sum_i^P \beta_i^2\Big)  
\end{bmatrix}

= \begin{bmatrix}
 \frac{\partial}{\partial \beta_1} \beta_1^2 +0 \dots +0   \\
 0 + \frac{\partial}{\partial \beta_2} \beta_2^2  \dots +0    \\
  \vdots \\
 0 + 0 \dots  \frac{\partial}{\partial \beta_P} \beta_P^2
\end{bmatrix}

= \begin{bmatrix}
  2\beta_1 \\
  2\beta_2 \\
  \vdots \\
  2\beta_P
    \end{bmatrix}

= 2\beta
    
$$

$$\frac{\partial PRSS_{l_2}}{\partial \beta} = -2X^T(y - X\beta) + 2 \lambda \beta $$

We now solve for where the derivative is equal to zero, to get the base of our bowl.

$$ 0 = -2X^T(y - X\beta) + 2 \lambda \beta $$

$$ 0 = -2X^Ty + 2X^TX\beta + 2\lambda \beta $$

$$ X^Ty = X^TX\beta + \lambda \beta $$

$$ X^Ty = (X^TX + \lambda I )\beta $$

$$ (X^TX + \lambda I )^{-1}X^Ty = \beta $$

Therefore, the effect of adding a squared $l_2$ norm to cost function we are choosing $\beta$ to minimise, is to add a a scalar
quantity to the diagonal of the $X^TX$ cross product matrix. 

## Augmented dataset formulation
Alternatively, ridge regression can be formulated as though the original dataset has been augmented as below:
 
$$
PRSS_{l_2} = \big(
  \begin{bmatrix}
  y_{n\times1} \\
  0_{p\times1}
    \end{bmatrix} -
   
   \begin{bmatrix}
   X_{n\times p} \\
   \lambda I_{p\times p} 
   \end{bmatrix}
   
   \beta_{p\times1}
   
   \big)^2
    
$$

Adding the vector of zeros to the end of the original $y$ vector, and a $p\times p$ identity matrix to the bottom of $X$ is 
 going to add terms of the following sort $(0-\lambda I\beta)^T(0-\lambda I\beta)$ to the RSS, which simplifies to adding $\lambda\beta^2$,
  getting us back to $PRSS_{l_2} = (y- X\beta)^T(y-X\beta) + \lambda \beta^T\beta $ from the top of the page.
  
Thinking about ridge regression in this way is cool. We are often worried (as it is often the case!) about our design/observation matrix $X$ being 
collinear, with linearly dependent columns, which can also be thought as data containing duplicate information. In contrast, the columns
of an identity matrix are supremely linearly independent, being orthogonal to each other. Therefore, by adding a scaled (by $\lambda$)
identity matrix to our dataset, we are forcing the columns to be more independent of each other, to contain different information. In cases of singular
$X$ matrices, with true linear dependence between columns, $X^TX$ cannot be inverted. By adding $\lambda I$, this collinearity will immediately disappear and the matrix will become invertible. 
For non-singular, but under-determined matrices, adding the ridge penalty will improve the numerical conditioning of $X^TX$'s inversion, improving the stability of $\beta$'s estimation.

Note the "information" that we are adding by appending the extra dataset may make us
less able to determine the true relationship between $y$ and $X$! We are assuming that the sizes of the elements of
 $\beta$ should be small, and explicitly shrinking the size of all of the $\beta$'s towards zero. As a consequence of
 this shrinking, regularisation techniques, such as adding the ridge penalty, are referred to by the literature as 
 *shrinkage* methods.
  
[//]: # *Do we go through geometric interpretation?*
[//]: # *Headers to write...*

## Effect on variance of beta

It's easy to think in terms of "for a particular dataset what is the best fitting $\beta$", and adding the regularising term
just helps prevent overfitting $\beta$ to this dataset. While this is correct, it's just one side of the coin. Instead, if
 we treat our particular dataset as being just one of the many possible datasets that could theoretically have been collected 
 (e.g. the group of people we randomly talked to out of a larger group) we can think in terms of how consistent our estimation
 of $\beta$ will be across these groups. Or, similarly, if we start removing random samples from our dataset, how robust will our
 $\beta$ fit be to these changes. This estimate of $\beta$ variance is what we need to start constructing confidence intervals for 
 $\beta$'s and what we will ultimatetly use for hypothesis testing. 
 
We therefore want to know the variance of our beta estimate:

$$ var(\beta) = var\big((X^TX)^{-1}X^Ty\big) $$

<span style="color:red">*Below is not finished: I'm just writing the equations, will come back later and sort this out with proper notes*</span>

making use of

$$var(AB) = A var(B) A^T$$

where A is a non-stochastic matrix, but B is stochastic. And now treating $(X^TX)^{-1}X^T$ as $A$, and $y$ as $B$ (think of the error on each sample):

$$ var(\beta) = (X^TX)^{-1}X^T var(y) \big((X^TX)^{-1}X^T \big)^T $$

now remembering our transpose and inverse rules.. *(put link in to rules)*

$$ var(\beta) = (X^TX)^{-1}X^T var(y) X (X^TX)^{-1}$$

now comes big assumption of the form of the errors on y... (*write out I matrix explicitly so can see no correlation of errors as just diagonal non zero*
)

$$ var(y) = \sigma^2I$$

$$ var(\beta) = (X^TX)^{-1}X^T \sigma^2I X (X^TX)^{-1}$$

move the scalar constant $\sigma^2$ in front and multiply $I$ with $A$. 

$$ var(\beta) = \sigma^2 (X^TX)^{-1}X^T X (X^TX)^{-1}$$

now cancel the inverse:

$$ var(\beta) = \sigma^2 (X^TX)^{-1}$$

the larger $X^TX$ the smaller $(X^TX)^{-1}$ and therefore the smaller the variance of our estimator.

For ridge regression, following the above steps yields:

$$var(\beta_{ridge}) = \sigma^2(X^TX+\lambda I)^{-1}X^TX(X^TX+\lambda I)^{-1}$$

Following the same logic of making the contents of the brackets that are to be inverted larger, 
adding the ridge penalty will decrease the variance of our estimate of $\beta$.

*possible extra sections: Eigenvalues/determinant, Pseudo inverse stuff*

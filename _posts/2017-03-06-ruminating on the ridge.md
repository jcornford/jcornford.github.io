---
layout: post
title: Basics 3&#58 Ruminating on the Ridge
subtitle: Regularising least squares with the squared $l_2$ norm
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

*go through getting this via summation notation...! (an easy one)*

$$\frac{\partial PRSS_{l_2}}{\partial \beta} = -2X^T(y - X\beta) + 2 \lambda \beta $$

We now solve for where the derivative is equal to zero, to get the base of our bowl.

$$ 0 = -2X^T(y - X\beta) + 2 \lambda \beta $$

$$ 0 = -2X^Ty + 2X^TX\beta + 2\lambda \beta $$

$$ X^Ty = X^TX\beta + \lambda \beta $$

$$ X^Ty = (X^TX + \lambda I )\beta $$

$$ (X^TX + \lambda I )^{-1}X^Ty = \beta $$



## Formulation as if another dataset added

## Effect on variance of beta

## Increasing Eigenvalues/determinant

## Pseudo inverse link
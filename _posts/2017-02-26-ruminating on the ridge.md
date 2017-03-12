---
layout: post
title: Basics 3&#58 Ruminating on the Ridge
subtitle: Regularising least squares with the squared $l_2$ norm
---

Ridge regression is an extension of least squares in which we impose a penalty on the size of the regression coefficients.
This results in the shrinkage of the estimated coefficients towards 0 (biasing the estimators), and a reduction in their variance. Adding the $l_2$ norm
also has a nice interpretation of stabilising under-determined systems that we will discuss.

## Introducing Ridge Regression:
Ridge regression, also called Tikhonov regularisation, adds the sum of the squared regression coefficients as a cost function to the residual sum of squares. We are therefore selecting a $\beta$ vector to minimise:

$$  \big( \sum_{i=1}^N y_i - \beta_0 - \sum_{j=1}^pX_{ij} \beta_j \big)^2 + \lambda \sum_{j=1}^p \beta_j^2$$

Where $\lambda$ is a positive valued scalar that controls the amount of penalisation. 

Note we are not including the intercept term $\beta_0$ in the cost function, and, further on, I will assume input matrix $X$ has been centered around
0, so we no longer need to augment it with a column of ones in order to incorporate $\beta_0$ in our matrix notation. Also, it is equally important to appreciate
 that the $\beta$ vector solution will be dependent on the units, or scaling, of the inputs - so the different inputs (or columns of $X$) should be standardised  before solving for $\beta$.

## Closed form solution

## Formulation as if another dataset added

## Effect on variance of beta

## Increasing Eigenvalues/determinant

## Pseudo inverse link
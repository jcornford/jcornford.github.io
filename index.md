---
layout: default
title: Jonathan Cornford's Website
---

<style>
.banner_image {
      padding-top: 20px;     
 }
 .image_container { 
   position: relative; 
   
   width: 100%; /* for IE 6 */
}
p span{
position: absolute;
   text-align:center;
   left: 0%;
   bottom:10%;
   color: white; 
   font:  25px  'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue','Open Sans', 'Lora','Arial', 'Times New Roman'; 
   letter-spacing: 0px;  
   background: rgb(0, 0, 0); /* fallback color */
   background: rgba(0, 0, 0, 0.5);
   padding: 5px; 

}
 h1 { 
   position: absolute;
   text-align:center;
   
   left: 0%;
   bottom:25%;
   //width: 100%; 
}
 h1 span { 
   color: white; 
   font:  45px  'HelveticaNeue-Light', 'Helvetica Neue Light','Helvetica Neue','Open Sans', 'Lora','Arial', 'Times New Roman'; 
   letter-spacing: 0px;  
   background: rgb(0, 0, 0); /* fallback color */
   background: rgba(0, 0, 0, 0.5);
   padding: 5px; 
}
</style>

<div class="image_container">
<img class= "banner_image" src="img/color_cropped.jpg">
<h1><span>Jonathan Cornford </span></h1>
<p><span> PhD Neuroscience, UCL</span></p>

</div>

## Welcome to my home page!
I'm Jonathan, about to finish my PhD in neuroscience at Queen Square, UCL. London. I'm interested in how single neurons work, and machine learning.
After a few blog posts, eventually I intend to have a play with using **spiking** neural networks to solve machine learning problems.
 
 

## Why this website?
My background is Biological, specifically Physiological Sciences (or Medicine without the troublesome people). I found when reading articles on machine learning
 and data-science that quite often the reader is assumed to have done Physics or Engineering. Alternatively, things might be laser-focused on concepts
  or implementation details, which can be really great, e.g. [Introduction to Statistical Learning](http://www-bcf.usc.edu/~gareth/ISL/), but I often
 wished for more details. However, if you go looking for those details, generally a prior familiarity with all of the maths is assumed - [Elements of Statisitical Learning](https://statweb.stanford.edu/~tibs/ElemStatLearn/)
 is a pretty big step up :] ( half of page 45, lines 3.3 to 3.6, is the entire focus of [posts 2](2017-01-07-least-squares-for-dummies/) and [2a](2017-01-08-scalar-by-vector-derivatives-for-least-squares)). 
 
 
So, this [blog](/blog) is intended to cross that bridge, filling in those details. I'll try to use coding to inform the maths, as the maths really started making more sense to me when thinking in terms of code. 

<a href="{{ blog | prepend: site.baseurl }}">